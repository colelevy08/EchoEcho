from flask import jsonify, request, redirect, url_for
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.exceptions import BadRequest
from models import User, Product, Order, Review, db


def initialize_routes(app):

    @app.route('/users', methods=['GET'])
    def get_users():
        users = User.query.all()
        return jsonify([user.to_dict() for user in users]), 200

    @app.route('/signup', methods=['POST'])
    def signup():
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        if username and email and password:
            user = User(username=username, email=email)
            user.set_password(password)
            db.session.add(user)
            db.session.commit()
            return jsonify(user.to_dict()), 201
        else:
            raise BadRequest('Missing username, email, or password')

    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()
        if user is None or not user.check_password(data['password']):
            return jsonify({'error': 'Invalid username or password'}), 400
        login_user(user)
        return jsonify(user.to_dict()), 200

    @app.route('/logout')
    @login_required
    def logout():
        logout_user()
        return jsonify({'message': 'Logged out'}), 200

    @app.route('/users/<int:id>', methods=['GET'])
    def get_user(id):
        user = User.query.get(id)
        if user is None:
            return jsonify({'error': 'User not found'}), 404
        return jsonify(user.to_dict()), 200

    @app.route('/users/<int:id>', methods=['PATCH'])
    @login_required
    def update_user(id):
        if current_user.id != id:
            return jsonify({'error': 'You can only update your own profile'}), 403
        data = request.get_json()
        current_user.username = data.get('username', current_user.username)
        current_user.email = data.get('email', current_user.email)
        if 'password' in data:
            current_user.set_password(data['password'])
        db.session.commit()
        return jsonify(current_user.to_dict()), 200

    @app.route('/marketplace', methods=['GET'])
    def get_products():
        products = Product.query.all()
        return jsonify([product.to_dict() for product in products]), 200

    @app.route('/marketplace', methods=['POST'])
    @login_required
    def add_product():
        data = request.get_json()
        product = Product(user_id=current_user.id, name=data['name'], description=data['description'], price=data['price'])
        db.session.add(product)
        db.session.commit()
        return jsonify(product.to_dict()), 201

    @app.route('/marketplace/<int:id>', methods=['GET'])
    def get_product(id):
        product = Product.query.get(id)
        if product is None:
            return jsonify({'error': 'Product not found'}), 404
        return jsonify(product.to_dict()), 200

    @app.route('/marketplace/<int:id>', methods=['PATCH'])
    @login_required
    def update_product(id):
        product = Product.query.get(id)
        if product is None or product.user_id != current_user.id:
            return jsonify({'error': 'Product not found'}), 404
        data = request.get_json()
        product.name = data.get('name', product.name)
        product.description = data.get('description', product.description)
        product.price = data.get('price', product.price)
        db.session.commit()
        return jsonify(product.to_dict()), 200

    @app.route('/marketplace/<int:id>', methods=['DELETE'])
    @login_required
    def delete_product(id):
        product = Product.query.get(id)
        if product is None or product.user_id != current_user.id:
            return jsonify({'error': 'Product not found'}), 404
        db.session.delete(product)
        db.session.commit()
        return jsonify({}), 204

    @app.route('/orders', methods=['GET'])
    @login_required
    def get_orders():
        orders = Order.query.filter_by(user_id=current_user.id)
        return jsonify([order.to_dict() for order in orders]), 200

    @app.route('/orders', methods=['POST'])
    @login_required
    def create_order():
        data = request.get_json()
        order = Order(user_id=current_user.id, product_id=data['product_id'], quantity=data['quantity'])
        db.session.add(order)
        db.session.commit()
        return jsonify(order.to_dict()), 201

    @app.route('/orders/<int:id>', methods=['PATCH'])
    @login_required
    def update_order(id):
        order = Order.query.get(id)
        if order is None or order.user_id != current_user.id:
            return jsonify({'error': 'Order not found'}), 404
        data = request.get_json()
        order.product_id = data.get('product_id', order.product_id)
        db.session.commit()
        return jsonify(order.to_dict()), 200

    @app.route('/orders/<int:id>', methods=['DELETE'])
    @login_required
    def delete_order(id):
        order = Order.query.get(id)
        if order is None or order.user_id != current_user.id:
            return jsonify({'error': 'Order not found'}), 404
        db.session.delete(order)
        db.session.commit()
        return jsonify({}), 204

    @app.route('/reviews', methods=['GET'])
    def get_reviews():
        reviews = Review.query.all()
        return jsonify([review.to_dict() for review in reviews]), 200

    @app.route('/reviews', methods=['POST'])
    @login_required
    def create_review():
        data = request.get_json()
        review = Review(user_id=current_user.id, product_id=data['product_id'], body=data['body'], rating=data['rating'])
        db.session.add(review)
        db.session.commit()
        return jsonify(review.to_dict()), 201

    @app.route('/reviews/<int:id>', methods=['PATCH'])
    @login_required
    def update_review(id):
        review = Review.query.get(id)
        if review is None or review.user_id != current_user.id:
            return jsonify({'error': 'Review not found'}), 404
        data = request.get_json()
        review.body = data.get('body', review.body)
        review.rating = data.get('rating', review.rating)
        db.session.commit()
        return jsonify(review.to_dict()), 200

    @app.route('/reviews/<int:id>', methods=['DELETE'])
    @login_required
    def delete_review(id):
        review = Review.query.get(id)
        if review is None or review.user_id != current_user.id:
            return jsonify({'error': 'Review not found'}), 404
        db.session.delete(review)
        db.session.commit()
        return jsonify({}), 204
