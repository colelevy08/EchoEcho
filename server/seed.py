from models import db, User, Product, Order, Review
from app import create_app
import random
import string

app = create_app()  # Create Flask app

# Start a new application context
with app.app_context():
    # Create users
    for i in range(10):  # Create 10 users
        username = f'user{i}'
        email = f'user{i}@example.com'
        user = User.query.filter_by(username=username).first()
        if user is None:
            user = User(username=username, email=email)
            user.set_password('password')  # Set user password
            db.session.add(user)  # Add the user to the database session

    db.session.commit()  # Commit the session to assign IDs

    # Create products
    for i in range(10):  # Create 10 products
        name = f'product{i}'
        description = 'description' + ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))  # Random description
        price = random.uniform(1.0, 100.0)  # Random price between 1.0 and 100.0
        product = Product(name=name, description=description, price=price)

        # Add product to the session
        db.session.add(product)

    db.session.commit()  # Commit the session to assign IDs

    # Assuming users and products were successfully added, create associations between users and products
    users = User.query.all()
    products = Product.query.all()

    for user in users:
        for product in products:
            # Each user orders each product once
            order = Order(user_id=user.id, product_id=product.id)
            db.session.add(order)

            # Each user reviews each product once
            review = Review(user_id=user.id, product_id=product.id, body='Great product!', rating=random.randint(1, 5))
            db.session.add(review)

            # Each user likes each product
            product.liked_by.append(user)

    # Commit the session again to save the associations
    db.session.commit()
