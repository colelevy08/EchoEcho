from models import db, User, Product, Order, Review
from app import create_app

app = create_app()

with app.app_context():
    # Create users
    usernames = ["user1", "user2", "user3", "user4", "user5"]
    emails = ["user1@example.com", "user2@example.com", "user3@example.com", "user4@example.com", "user5@example.com"]
    passwords = ["password1", "password2", "password3", "password4", "password5"]
    for i in range(5):
        user = User.query.filter_by(username=usernames[i]).first()
        if user is None:
            user = User(username=usernames[i], email=emails[i])
            user.set_password(passwords[i])
            db.session.add(user)
    db.session.commit()

    # Create products
    product_names = ["product1", "product2", "product3", "product4", "product5"]
    product_descriptions = ["description1", "description2", "description3", "description4", "description5"]
    product_prices = [10.99, 20.99, 30.99, 40.99, 50.99]
    for i in range(5):
        product = Product(name=product_names[i], description=product_descriptions[i], price=product_prices[i])
        db.session.add(product)
    db.session.commit()

    # Create orders and reviews
    for i in range(1, 6):
        user = User.query.get(i)
        for j in range(1, 6):
            product = Product.query.get(j)
            order = Order(user_id=user.id, product_id=product.id, quantity=j)
            db.session.add(order)
            review = Review(user_id=user.id, product_id=product.id, body=f"Review {j} by {user.username}", rating=j)
            db.session.add(review)
            product.liked_by.append(user)
    db.session.commit()
