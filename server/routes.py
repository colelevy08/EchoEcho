from flask import jsonify, request
from flask_login import current_user, login_user, logout_user
from werkzeug.exceptions import BadRequest
from models import User, Product, Order, Review, db
from flask_cors import CORS
from sqlalchemy import exc

# Function to register routes
def register_routes(app):

    @app.route('/users', methods=['GET'])
    def get_users():
        users = User.query.all()
        return jsonify([user.to_dict() for user in users]), 200

    @app.route('/users/<int:id>', methods=['GET'])
    def get_user(id):
        user = User.query.get(int(id))
        if user:
            return jsonify(user.to_dict())
        return jsonify({"error": "User not found"}), 404

    @app.route('/products', methods=['GET'])
    def get_products():
        products = Product.query.all()
        return jsonify([product.to_dict() for product in products]), 200

    @app.route('/orders', methods=['GET'])
    def get_orders():
        orders = Order.query.all()
        return jsonify([order.to_dict() for order in orders]), 200

    @app.route('/reviews', methods=['GET'])
    def get_reviews():
        reviews = Review.query.all()
        return jsonify([review.to_dict() for review in reviews]), 200

    @app.route('/products/<int:product_id>/like', methods=['POST'])
    def like_product(product_id):
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        if current_user.is_liking(product):
            return jsonify({'error': 'Product already liked'}), 400
        current_user.like_product(product)
        db.session.commit()
        return jsonify({'message': 'Product liked'}), 200

    @app.route('/products/<int:product_id>/unlike', methods=['POST'])
    def unlike_product(product_id):
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        if not current_user.is_liking(product):
            return jsonify({'error': 'Product not liked yet'}), 400
        current_user.unlike_product(product)
        db.session.commit()
        return jsonify({'message': 'Product unliked'}), 200

    @app.route('/users/<int:user_id>/liked-products', methods=['GET'])
    def get_user_likes(user_id):
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        liked_products = user.likes
        return jsonify([product.to_dict() for product in liked_products]), 200

    @app.route('/products/<int:product_id>/likers', methods=['GET'])
    def get_product_likes(product_id):
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        likers = product.liked_by
        return jsonify([user.to_dict() for user in likers]), 200

    @app.route('/users/current-user/liked-products', methods=['GET'])
    def get_user_liked_products():
        liked_products = current_user.likes
        return jsonify([product.to_dict() for product in liked_products]), 200
    
    @app.route('/users/current-user', methods=['GET'])
    def get_current_user():
        if current_user.is_authenticated:
            return jsonify(current_user.to_dict()), 200
        else:
            return jsonify({'message': 'No user logged in'}), 200

        
    @app.route('/signup', methods=['POST'])
    def signup():
        if not request.is_json:
            return jsonify({"error": "Missing JSON in request"}), 400

        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not username or len(username) < 3:
            return jsonify({"error": "Username must be at least 3 characters"}), 400
        if not email or "@" not in email:
            return jsonify({"error": "Invalid email address"}), 400
        if not password or len(password) < 8:
            return jsonify({"error": "Password must be at least 8 characters"}), 400

        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({'error': 'Username already exists'}), 400

        user = User(username=username, email=email)
        user.set_password(password)  # Assuming this method hashes the password
        db.session.add(user)
        try:
            db.session.commit()
        except exc.IntegrityError:
            db.session.rollback()
            return jsonify({'error': 'Email already exists'}), 400

        return jsonify(user.to_dict()), 201


    @app.route('/login', methods=['POST'])
    def login():
        if not request.is_json:
            return jsonify({"error": "Missing JSON in request"}), 400

        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or "@" not in email:
            return jsonify({"error": "Invalid email address"}), 400
        if not password:
            return jsonify({"error": "Missing password"}), 400

        user = User.query.filter_by(email=email).first()
        if user is None or not user.check_password(password):
            return jsonify({'error': 'Invalid email or password'}), 401

        login_user(user)
        next_page = request.args.get('next')
        return redirect(next_page) if next_page else redirect(url_for('home'))  # Corrected here


    @app.route('/logout', methods=['GET'])
    def logout():
        logout_user()
        return jsonify({'message': 'Logged out'}), 200

    @app.route('/users/<int:id>', methods=['PUT'])
    def update_user(id):
        if current_user.id != id:
            return jsonify({'error': 'You can only update your own profile'}), 403
        if not request.is_json:
            return jsonify({"error": "Missing JSON in request"}), 400

        data = request.get_json()
        username = data.get('username', current_user.username)
        email = data.get('email', current_user.email)
        password = data.get('password')

        if username and len(username) < 3:
            return jsonify({"error": "Username must be at least 3 characters"}), 400
        if email and "@" not in email:
            return jsonify({"error": "Invalid email address"}), 400
        if password and len(password) < 8:
            return jsonify({"error": "Password must be at least 8 characters"}), 400

        current_user.username = username
        current_user.email = email
        if password:
            try:
                current_user.set_password(password)
            except ValueError as e:
                return jsonify({'error': str(e)}), 400

        try:
            db.session.commit()
        except exc.IntegrityError:
            db.session.rollback()
            return jsonify({'error': 'Email already exists'}), 400

        return jsonify(current_user.to_dict()), 200

    @app.route('/orders', methods=['POST'])
    def create_order():
        try:
            data = request.get_json()

            # Validate input data
            if not data:
                return jsonify({'error': 'Missing data'}), 400

            product_id = data.get('productId')
            if not product_id:
                return jsonify({'error': 'Product ID is required'}), 400

            quantity = data.get('quantity')
            if not quantity:
                return jsonify({'error': 'Quantity is required'}), 400

            shipping_address = data.get('shippingAddress')  # Fixed variable name
            if not shipping_address:  # Fixed condition
                return jsonify({'error': 'shippingAddress is required'}), 400

            user_id = data.get('userId')  # Fixed variable name
            if not user_id:
                return jsonify({'error': 'user_Id is required'}), 400

            # Ensure product exists
            product = Product.query.get(product_id)
            if not product:
                return jsonify({'error': 'Product not found'}), 404

            # Create order
            order = Order(product_id=product_id, quantity=quantity, user_id=user_id, shipping_address=shipping_address)  # Added shipping_address
            db.session.add(order)
            db.session.commit()

            return jsonify(order.to_dict()), 201

        except Exception as e:
            return jsonify({'error': str(e)}), 500


    @app.route('/reviews', methods=['POST'])
    def create_review():
        data = request.get_json()
        product_id = data.get('product')
        rating = data.get('rating')
        review_text = data.get('review')

        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': 'Product not found'}), 404

        review = Review(product_id=product_id, rating=rating, review_text=review_text, user_id=current_user.id)
        db.session.add(review)
        db.session.commit()

        return jsonify(review.to_dict()), 201

    @app.route('/products', methods=['POST'])
    def create_product():
        print(request.get_json())
        
        if not request.is_json:
            return jsonify({"error": "Missing JSON in request"}), 400

        data = request.get_json()
        name = data.get('name')
        description = data.get('description')
        price = data.get('price')
        price = float(price) if price else None

        # Here, let's add default values for the fields that were missing:
        image_url = data.get('image_url', None)  # default to None if not provided
        stock_quantity = data.get('stock_quantity', 0)  # default to 0 if not provided
        category = data.get('category', None)  # default to None if not provided

        if not name or len(name) < 3:
            return jsonify({"error": "Name must be at least 3 characters"}), 400
        if not description or len(description) < 10:
            return jsonify({"error": "Description must be at least 10 characters"}), 400
        if not price or price < 0:
            return jsonify({"error": "Price must be a positive number"}), 400

        existing_product = Product.query.filter_by(name=name).first()
        if existing_product:
            return jsonify({'error': 'Product already exists'}), 400

        product = Product(
            name=name, 
            description=description, 
            price=price, 
            image_url=image_url,  # Add these fields to the product creation
            stock_quantity=stock_quantity,
            category=category
        )
        db.session.add(product)
        db.session.commit()

        return jsonify(product.to_dict()), 201

    @app.route('/products/<int:product_id>/reviews', methods=['GET'])
    def get_product_reviews(product_id):
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        reviews = Review.query.filter_by(product_id=product_id).all()
        return jsonify([review.to_dict() for review in reviews]), 200

    # @app.route('/products', methods=['GET'])
    # def get_products():
    #     products = Product.query.all()
    #     return jsonify([product.to_dict() for product in products]), 200

    @app.route('/products/<int:id>', methods=['GET'])
    def get_product_detail(id):
        product = Product.query.get(int(id))
        if product:
            return jsonify(product.to_dict()), 200
        else:
            return jsonify({'error': 'Product not found'}), 404

    @app.route('/products/<int:id>', methods=['PATCH'])
    def update_product(id):
        if not request.is_json:
            return jsonify({"error": "Missing JSON in request"}), 400

        product = Product.query.get(int(id))
        if not product:
            return jsonify({'error': 'Product not found'}), 404

        data = request.get_json()
        name = data.get('name', product.name)
        description = data.get('description', product.description)
        price = data.get('price', product.price)

        if not name or len(name) < 3:
            return jsonify({"error": "Name must be at least 3 characters"}), 400
        if not description or len(description) < 10:
            return jsonify({"error": "Description must be at least 10 characters"}), 400
        if not price or price < 0:
            return jsonify({"error": "Price must be a positive number"}), 400

        product.name = name
        product.description = description
        product.price = price

        db.session.commit()
        return jsonify(product.to_dict()), 200

    @app.route('/products/<int:id>', methods=['DELETE'])
    def delete_product(id):
        product = Product.query.get(int(id))
        if not product:
            return jsonify({'error': 'Product not found'}), 404

        db.session.delete(product)
        db.session.commit()
        return jsonify({'message': 'Product deleted'}), 200

    @app.route('/orders/<int:id>', methods=['GET'])
    def get_order(id):
        order = Order.query.get(int(id))
        if not order:
            return jsonify({'error': 'Order not found'}), 404

        return jsonify(order.to_dict()), 200

    @app.route('/orders/<int:id>', methods=['PATCH'])
    def update_order(id):
        if not request.is_json:
            return jsonify({"error": "Missing JSON in request"}), 400

        order = Order.query.get(int(id))
        if not order:
            return jsonify({'error': 'Order not found'}), 404

        data = request.get_json()
        product_id = data.get('product_id', order.product_id)
        quantity = data.get('quantity', order.quantity)

        if not product_id or not Product.query.get(product_id):
            return jsonify({"error": "Invalid product ID"}), 400
        if not quantity or quantity < 1:
            return jsonify({"error": "Quantity must be at least 1"}), 400

        order.product_id = product_id
        order.quantity = quantity

        db.session.commit()
        return jsonify(order.to_dict()), 200

    @app.route('/orders/<int:id>', methods=['DELETE'])
    def delete_order(id):
        order = Order.query.get(int(id))
        if not order:
            return jsonify({'error': 'Order not found'}), 404

        db.session.delete(order)
        db.session.commit()
        return jsonify({'message': 'Order deleted'}), 200

    CORS(app, supports_credentials=True)

 