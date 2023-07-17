from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.exceptions import BadRequest
from models import User, Product, Order, Review, db
from flask_cors import CORS

main_routes = Blueprint('main', __name__)  # Create a Blueprint for the routes

# Users
@main_routes.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200


@main_routes.route('/users/current-user', methods=['GET'])
def get_current_user():
    if current_user.is_authenticated:
        return jsonify(current_user.to_dict()), 200
    else:
        return jsonify({'error': 'No user logged in'}), 401

@main_routes.route('/signup', methods=['POST'])
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
        login_user(user)  # Log the user in after signup
        return jsonify(user.to_dict()), 201
    else:
        raise BadRequest('Missing username, email, or password')

@main_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user is None or not user.check_password(data['password']):
        return jsonify({'error': 'Invalid username or password'}), 400
    login_user(user)
    return jsonify(user.to_dict()), 200

@main_routes.route('/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out'}), 200

@main_routes.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(int(id))
    if user:
        return jsonify(user.to_dict())
    return jsonify({"error": "User not found"}), 404

@main_routes.route('/users/<int:id>', methods=['PATCH'])
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

# Marketplace
@main_routes.route('/marketplace', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200

@main_routes.route('/marketplace', methods=['POST'])
@login_required
def add_product():
    data = request.get_json()
    product = Product(user_id=current_user.id, name=data['name'], description=data['description'], price=data['price'])
    db.session.add(product)
    db.session.commit()
    return jsonify(product.to_dict()), 201

@main_routes.route('/marketplace/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)
    if product is None:
        return jsonify({'error': 'Product not found'}), 404
    return jsonify(product.to_dict()), 200  # Call the to_dict method to get a dictionary representation of the product


@main_routes.route('/marketplace/<int:id>', methods=['PATCH'])
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

@main_routes.route('/marketplace/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    product = Product.query.get(id)
    if product is None or product.user_id != current_user.id:
        return jsonify({'error': 'Product not found'}), 404
    db.session.delete(product)
    db.session.commit()
    return jsonify({}), 204

# Orders
@main_routes.route('/orders', methods=['GET'])
@login_required
def get_orders():
    orders = Order.query.filter_by(user_id=current_user.id)
    return jsonify([order.to_dict() for order in orders]), 200

@main_routes.route('/orders', methods=['POST'])
@login_required
def create_order():
    data = request.get_json()
    order = Order(user_id=current_user.id, product_id=data['product_id'], quantity=data['quantity'])
    db.session.add(order)
    db.session.commit()
    return jsonify(order.to_dict()), 201

@main_routes.route('/orders/<int:id>', methods=['PATCH'])
@login_required
def update_order(id):
    order = Order.query.get(id)
    if order is None or order.user_id != current_user.id:
        return jsonify({'error': 'Order not found'}), 404
    data = request.get_json()
    order.product_id = data.get('product_id', order.product_id)
    db.session.commit()
    return jsonify(order.to_dict()), 200

@main_routes.route('/orders/<int:id>', methods=['DELETE'])
@login_required
def delete_order(id):
    order = Order.query.get(id)
    if order is None or order.user_id != current_user.id:
        return jsonify({'error': 'Order not found'}), 404
    db.session.delete(order)
    db.session.commit()
    return jsonify({}), 204

# Reviews
@main_routes.route('/reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    return jsonify([review.to_dict() for review in reviews]), 200

@main_routes.route('/reviews', methods=['POST'])
@login_required
def create_review():
    data = request.get_json()
    review = Review(user_id=current_user.id, product_id=data['product_id'], body=data['body'], rating=data['rating'])
    db.session.add(review)
    db.session.commit()
    return jsonify(review.to_dict()), 201

@main_routes.route('/reviews/<int:id>', methods=['PATCH'])
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

@main_routes.route('/reviews/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    if review is None or review.user_id != current_user.id:
        return jsonify({'error': 'Review not found'}), 404
    db.session.delete(review)
    db.session.commit()
    return jsonify({}), 204

@main_routes.route('/products/<int:id>/like', methods=['POST'])
@login_required
def like_product(id):
    product = Product.query.get(id)
    if product is None:
        return jsonify({'error': 'Product not found'}), 404
    if product in current_user.likes:
        return jsonify({'error': 'Product already liked'}), 400
    current_user.likes.append(product)
    db.session.commit()
    return jsonify(product.to_dict()), 200

@main_routes.route('/products/<int:id>/unlike', methods=['POST'])
@login_required
def unlike_product(id):
    product = Product.query.get(id)
    if product is None:
        return jsonify({'error': 'Product not found'}), 404
    if product not in current_user.likes:
        return jsonify({'error': 'Product not already liked'}), 400
    current_user.likes.remove(product)
    db.session.commit()
    return jsonify(product.to_dict()), 200