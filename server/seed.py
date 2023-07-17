from models import db, User, Product, marketplace
from app import create_app

app = create_app()  # Create Flask app

# Start a new application context
with app.app_context():

    # Create users
    if User.query.filter_by(username='user1').first() is None:
        user1 = User(username='user1', email='user1@example.com')
        user1.set_password('password')  # Set user password
        db.session.add(user1)

    if User.query.filter_by(username='user2').first() is None:
        user2 = User(username='user2', email='user2@example.com')
        user2.set_password('password')  # Set user password
        db.session.add(user2)

    db.session.commit()  # Commit the session to assign IDs

    # Create products
    product1 = Product(name='product1', description='description1', price=9.99)
    product2 = Product(name='product2', description='description2', price=19.99)

    # Add products to the session
    db.session.add(product1)
    db.session.add(product2)

    db.session.commit()  # Commit the session to assign IDs

    # Assuming users were successfully added, create associations between users and products
    user1 = User.query.filter_by(username='user1').first()
    user2 = User.query.filter_by(username='user2').first()

    if user1 is not None and product1 is not None:
        db.session.execute(marketplace.insert().values(user_id=user1.id, product_id=product1.id))

    if user2 is not None and product2 is not None:
        db.session.execute(marketplace.insert().values(user_id=user2.id, product_id=product2.id))

    # Commit the session again to save the associations
    db.session.commit()
