from flask import Flask, request, render_template, flash, redirect, url_for, jsonify
from flask_login import login_required, login_user, logout_user, current_user
from models import User, Friendship, Message, Product, Order, Review
from app import app, db, login


# LOGIN AND LOGOUT
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    # Add signup logic here
    return jsonify({}), 201

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = User.query.filter_by(username=request.form['username']).first()
        if user is None or not user.check_password(request.form['password']):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user)
        return redirect(url_for('index'))
    return render_template('login.html')
from flask_login import logout_user

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))


# USER ROUTES
@app.route('/users', methods=['GET'])
@login_required
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

@app.route('/users/<int:id>', methods=['GET'])
@login_required
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



# FRIEND ROUTES
@app.route('/users/<int:id>/friends', methods=['GET'])
@login_required
def get_friends(id):
    user = User.query.get(id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    return jsonify([friendship.to_dict() for friendship in user.friendships]), 200

@app.route('/users/<int:id>/friends', methods=['POST'])
@login_required
def add_friend(id):
    friend = User.query.get(id)
    if friend is None:
        return jsonify({'error': 'User not found'}), 404
    friendship = Friendship(user_id=current_user.id, friend_id=id)
    db.session.add(friendship)
    db.session.commit()
    return jsonify(friendship.to_dict()), 201

@app.route('/users/<int:id>/friends/<int:friend_id>', methods=['DELETE'])
@login_required
def remove_friend(id, friend_id):
    friendship = Friendship.query.filter_by(user_id=id, friend_id=friend_id).first()
    if friendship is None:
        return jsonify({'error': 'Friendship not found'}), 404
    db.session.delete(friendship)
    db.session.commit()
    return jsonify({}), 204


# MESSAGE ROUTES
@app.route('/users/<int:id>/messages', methods=['GET'])
@login_required
def get_messages(id):
    user = User.query.get(id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    return jsonify([message.to_dict() for message in user.messages]), 200

@app.route('/users/<int:id>/messages', methods=['POST'])
@login_required
def send_message(id):
    recipient = User.query.get(id)
    if recipient is None:
        return jsonify({'error': 'User not found'}), 404
    data = request.get_json()
    message = Message(sender_id=current_user.id, recipient_id=id, body=data['body'])
    db.session.add(message)
    db.session.commit()
    return jsonify(message.to_dict()), 201

@app.route('/users/<int:id>/messages/<int:message_id>', methods=['DELETE'])
@login_required
def delete_message(id, message_id):
    message = Message.query.get(message_id)
    if message is None or message.sender_id != current_user.id:
        return jsonify({'error': 'Message not found'}), 404
    db.session.delete(message)
    db.session.commit()
    return jsonify({}), 204


# MARKETPLACE ROUTES
@app.route('/marketplace', methods=['GET'])
@login_required
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


# ORDER ROUTES
@app.route('/orders', methods=['GET'])
@login_required
def get_orders():
    orders = Order.query.filter_by(user_id=current_user.id)
    return jsonify([order.to_dict() for order in orders]), 200

@app.route('/orders', methods=['POST'])
@login_required
def create_order():
    data = request.get_json()
    order = Order(user_id=current_user.id, product_id=data['product_id'])
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


# REVIEW ROUTES
@app.route('/reviews', methods=['GET'])
@login_required
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

