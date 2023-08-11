from flask import jsonify, request
from flask_login import login_required, current_user, login_user, logout_user
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

    @app.route('/products/<int:id>', methods=['GET'])
    def get_product(id):
        product = Product.query.get(int(id))
        if product:
            return jsonify(product.to_dict())
        return jsonify({"error": "Product not found"}), 404

    @app.route('/orders', methods=['GET'])
    def get_orders():
        orders = Order.query.all()
        return jsonify([order.to_dict() for order in orders]), 200

    @app.route('/reviews', methods=['GET'])
    def get_reviews():
        reviews = Review.query.all()
        return jsonify([review.to_dict() for review in reviews]), 200

    @app.route('/products/<int:product_id>/like', methods=['POST'])
    @login_required
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
    @login_required
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
    @login_required
    def get_user_liked_products():
        liked_products = current_user.likes
        return jsonify([product.to_dict() for product in liked_products]), 200

    @app.route('/users/current-user', methods=['GET'])
    def get_current_user():
        if current_user.is_authenticated:
            return jsonify(current_user.to_dict()), 200
        else:
            return jsonify({'error': 'No user logged in'}), 401
        
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
        user.set_password(password)
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
        return jsonify(user.to_dict()), 201 

    @app.route('/logout', methods=['GET'])
    @login_required
    def logout():
        logout_user()
        return jsonify({'message': 'Logged out'}), 200

    @app.route('/users/<int:id>', methods=['PUT'])
    @login_required
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
    @login_required
    def create_order():
        data = request.get_json()
        product_id = data.get('product')
        quantity = data.get('quantity')

        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': 'Product not found'}), 404

        order = Order(product_id=product_id, quantity=quantity, user_id=current_user.id)
        db.session.add(order)
        db.session.commit()

        return jsonify(order.to_dict()), 201

    @app.route('/reviews', methods=['POST'])
    @login_required
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
    @login_required
    def create_product():
        if not request.is_json:
            return jsonify({"error": "Missing JSON in request"}), 400

        data = request.get_json()
        name = data.get('name')
        description = data.get('description')
        price = data.get('price')

        if not name or len(name) < 3:
            return jsonify({"error": "Name must be at least 3 characters"}), 400
        if not description or len(description) < 10:
            return jsonify({"error": "Description must be at least 10 characters"}), 400
        if not price or price < 0:
            return jsonify({"error": "Price must be a positive number"}), 400

        existing_product = Product.query.filter_by(name=name).first()
        if existing_product:
            return jsonify({'error': 'Product already exists'}), 400

        product = Product(name=name, description=description, price=price)
        db.session.add(product)
        db.session.commit()
        return jsonify(product.to_dict()), 

    @app.route('/products/<int:product_id>/reviews', methods=['GET'])
    def get_product_reviews(product_id):
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        reviews = Review.query.filter_by(product_id=product_id).all()
        return jsonify([review.to_dict() for review in reviews]), 200

    @app.route('/marketplace', methods=['GET'])
    def get_marketplace():
        products = Product.query.all()
        return jsonify([product.to_dict() for product in products]), 200

    @app.route('/marketplace/<int:id>', methods=['GET'])
    def get_product_detail(id):
        product = Product.query.get(int(id))
        if product:
            return jsonify(product.to_dict()), 200
        else:
            return jsonify({'error': 'Product not found'}), 404
        