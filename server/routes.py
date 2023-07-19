from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.exceptions import BadRequest
from models import User, Product, Order, Review, db
from flask_cors import CORS

main_routes = Blueprint('main', __name__)  # Create a Blueprint for the routes

# Users
@main_routes.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()  # Query all users
    return jsonify([user.to_dict() for user in users]), 200  # Return a list of all users as JSON

@main_routes.route('/users/current-user', methods=['GET'])
def get_current_user():
    if current_user.is_authenticated:  # If the current user is authenticated
        return jsonify(current_user.to_dict()), 200  # Return the current user as JSON
    else:
        return jsonify({'error': 'No user logged in'}), 401  # Return an error message as JSON

@main_routes.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()  # Get the JSON data from the request
    username = data.get('username')  # Get the 'username' field from the JSON data
    email = data.get('email')  # Get the 'email' field from the JSON data
    password = data.get('password')  # Get the 'password' field from the JSON data
    
    # Check if a user with the given username already exists
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'error': 'Username already exists'}), 400  # Return an error message as JSON

    if username and email and password:  # If 'username', 'email', and 'password' are all not None
        user = User(username=username, email=email)  # Create a new User instance
        user.set_password(password)  # Set the user's password
        db.session.add(user)  # Add the user to the database session
        db.session.commit()  # Commit the changes to the database
        login_user(user)  # Log the user in
        return jsonify(user.to_dict()), 201  # Return the new user as JSON
    else:
        raise BadRequest('Missing username, email, or password')  # Raise a BadRequest exception if any field is missing


@main_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()  # Get the JSON data from the request
    user = User.query.filter_by(email=data['email']).first()  # Query the user by 'username'
    if user is None or not user.check_password(data['password']):  # If the user does not exist or the password is incorrect
        return jsonify({'error': 'Invalid username or password'}), 400  # Return an error message as JSON
    login_user(user)  # Log the user in
    return jsonify(user.to_dict()), 200  # Return the logged in user as JSON

@main_routes.route('/logout', methods=['GET'])
@login_required  # Require the user to be logged in
def logout():
    logout_user()  # Log the user out
    return jsonify({'message': 'Logged out'}), 200  # Return a success message as JSON

@main_routes.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(int(id))  # Query the user by ID
    if user:  # If the user exists
        return jsonify(user.to_dict())  # Return the user as JSON
    return jsonify({"error": "User not found"}), 404  # Return an error message as JSON

@main_routes.route('/users/<int:id>', methods=['PATCH'])
@login_required  # Require the user to be logged in
def update_user(id):
    if current_user.id != id:  # If the current user is not the user being updated
        return jsonify({'error': 'You can only update your own profile'}), 403  # Return an error message as JSON
    data = request.get_json()  # Get the JSON data from the request
    current_user.username = data.get('username', current_user.username)  # Update the username if provided
    current_user.email = data.get('email', current_user.email)  # Update the email if provided
    if 'password' in data:  # If a new password is provided
        current_user.set_password(data['password'])  # Set the new password
    db.session.commit()  # Commit the changes to the database
    return jsonify(current_user.to_dict()), 200  # Return the updated user as JSON

# Marketplace
@main_routes.route('/marketplace', methods=['GET'])
def get_products():
    products = Product.query.all()  # Query all products
    return jsonify([product.to_dict() for product in products]), 200  # Return a list of all products as JSON

@main_routes.route('/marketplace', methods=['POST'])
@login_required  # Require the user to be logged in
def add_product():
    data = request.get_json()  # Get the JSON data from the request
    product = Product(user_id=current_user.id, name=data['name'], description=data['description'], price=data['price'])  # Create a new Product instance
    db.session.add(product)  # Add the product to the database session
    db.session.commit()  # Commit the changes to the database
    return jsonify(product.to_dict()), 201  # Return the new product as JSON

@main_routes.route('/marketplace/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)  # Query the product by ID
    if product is None:  # If the product does not exist
        return jsonify({'error': 'Product not found'}), 404  # Return an error message as JSON
    return jsonify(product.to_dict()), 200  # Return the product as JSON

@main_routes.route('/marketplace/<int:id>', methods=['PATCH'])
@login_required  # Require the user to be logged in
def update_product(id):
    product = Product.query.get(id)  # Query the product by ID
    if product is None or product.user_id != current_user.id:  # If the product does not exist or the current user is not the product's user
        return jsonify({'error': 'Product not found'}), 404  # Return an error message as JSON
    data = request.get_json()  # Get the JSON data from the request
    product.name = data.get('name', product.name)  # Update the product name if provided
    product.description = data.get('description', product.description)  # Update the product description if provided
    product.price = data.get('price', product.price)  # Update the product price if provided
    db.session.commit()  # Commit the changes to the database
    return jsonify(product.to_dict()), 200  # Return the updated product as JSON

@main_routes.route('/marketplace/<int:id>', methods=['DELETE'])
@login_required  # Require the user to be logged in
def delete_product(id):
    product = Product.query.get(id)  # Query the product by ID
    if product is None or product.user_id != current_user.id:  # If the product does not exist or the current user is not the product's user
        return jsonify({'error': 'Product not found'}), 404  # Return an error message as JSON
    db.session.delete(product)  # Delete the product from the database session
    db.session.commit()  # Commit the changes to the database
    return jsonify({}), 204  # Return an empty response

# Orders
@main_routes.route('/orders', methods=['GET'])
@login_required  # Require the user to be logged in
def get_orders():
    orders = Order.query.filter_by(user_id=current_user.id)  # Query all orders by the current user
    return jsonify([order.to_dict() for order in orders]), 200  # Return a list of all orders as JSON

@main_routes.route('/orders', methods=['POST'])
@login_required  # Require the user to be logged in
def create_order():
    data = request.get_json()  # Get the JSON data from the request
    order = Order(user_id=current_user.id, product_id=data['product_id'], quantity=data['quantity'])  # Create a new Order instance
    db.session.add(order)  # Add the order to the database session
    db.session.commit()  # Commit the changes to the database
    return jsonify(order.to_dict()), 201  # Return the new order as JSON

@main_routes.route('/orders/<int:id>', methods=['PATCH'])
@login_required  # Require the user to be logged in
def update_order(id):
    order = Order.query.get(id)  # Query the order by ID
    if order is None or order.user_id != current_user.id:  # If the order does not exist or the current user is not the order's user
        return jsonify({'error': 'Order not found'}), 404  # Return an error message as JSON
    data = request.get_json()  # Get the JSON data from the request
    order.product_id = data.get('product_id', order.product_id)  # Update the product ID if provided
    db.session.commit()  # Commit the changes to the database
    return jsonify(order.to_dict()), 200  # Return the updated order as JSON

@main_routes.route('/orders/<int:id>', methods=['DELETE'])
@login_required  # Require the user to be logged in
def delete_order(id):
    order = Order.query.get(id)  # Query the order by ID
    if order is None or order.user_id != current_user.id:  # If the order does not exist or the current user is not the order's user
        return jsonify({'error': 'Order not found'}), 404  # Return an error message as JSON
    db.session.delete(order)  # Delete the order from the database session
    db.session.commit()  # Commit the changes to the database
    return jsonify({}), 204  # Return an empty response

# Reviews
@main_routes.route('/reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()  # Query all reviews
    return jsonify([review.to_dict() for review in reviews]), 200  # Return a list of all reviews as JSON

@main_routes.route('/reviews', methods=['POST'])
@login_required  # Require the user to be logged in
def create_review():
    data = request.get_json()  # Get the JSON data from the request
    review = Review(user_id=current_user.id, product_id=data['product_id'], body=data['body'], rating=data['rating'])  # Create a new Review instance
    db.session.add(review)  # Add the review to the database session
    db.session.commit()  # Commit the changes to the database
    return jsonify(review.to_dict()), 201  # Return the new review as JSON

@main_routes.route('/reviews/<int:id>', methods=['PATCH'])
@login_required  # Require the user to be logged in
def update_review(id):
    review = Review.query.get(id)  # Query the review by ID
    if review is None or review.user_id != current_user.id:  # If the review does not exist or the current user is not the review's user
        return jsonify({'error': 'Review not found'}), 404  # Return an error message as JSON
    data = request.get_json()  # Get the JSON data from the request
    review.body = data.get('body', review.body)  # Update the review body if provided
    review.rating = data.get('rating', review.rating)  # Update the review rating if provided
    db.session.commit()  # Commit the changes to the database
    return jsonify(review.to_dict()), 200  # Return the updated review as JSON

@main_routes.route('/reviews/<int:id>', methods=['DELETE'])
@login_required  # Require the user to be logged in
def delete_review(id):
    review = Review.query.get(id)  # Query the review by ID
    if review is None or review.user_id != current_user.id:  # If the review does not exist or the current user is not the review's user
        return jsonify({'error': 'Review not found'}), 404  # Return an error message as JSON
    db.session.delete(review)  # Delete the review from the database session
    db.session.commit()  # Commit the changes to the database
    return jsonify({}), 204  # Return an empty response

@main_routes.route('/products/<int:id>/like', methods=['POST'])
@login_required  # Require the user to be logged in
def like_product(id):
    product = Product.query.get(id)  # Query the product by ID
    if product is None:  # If the product does not exist
        return jsonify({'error': 'Product not found'}), 404  # Return an error message as JSON
    if product in current_user.likes:  # If the current user already likes the product
        return jsonify({'error': 'Product already liked'}), 400  # Return an error message as JSON
    current_user.likes.append(product)  # Add the product to the current user's likes
    db.session.commit()  # Commit the changes to the database
    return jsonify(product.to_dict()), 200  # Return the liked product as JSON

@main_routes.route('/products/<int:id>/unlike', methods=['POST'])
@login_required  # Require the user to be logged in
def unlike_product(id):
    product = Product.query.get(id)  # Query the product by ID
    if product is None:  # If the product does not exist
        return jsonify({'error': 'Product not found'}), 404  # Return an error message as JSON
    if product not in current_user.likes:  # If the current user does not like the product
        return jsonify({'error': 'Product not already liked'}), 400  # Return an error message as JSON
    current_user.likes.remove(product)  # Remove the product from the current user's likes
    db.session.commit()  # Commit the changes to the database
    return jsonify(product.to_dict()), 200  # Return the unliked product as JSON
