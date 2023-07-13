from app import app
from models import db, User, Product, Order

with app.app_context():
    # Create some users
    user1 = User.query.filter_by(username='Cole Levy').first()
    if not user1:
        user1 = User(username='Cole Levy', email='colelevy08@gmail.com')
        user1.set_password('EchoEcho')
        db.session.add(user1)
        db.session.commit()  # Commit immediately to ensure we have an ID for user1

    user2 = User.query.filter_by(username='user2').first()
    if not user2:
        user2 = User(username='user2', email='user2@example.com')
        user2.set_password('password')
        db.session.add(user2)
        db.session.commit()  # Commit immediately to ensure we have an ID for user2

    # Create some products
    product1 = Product.query.filter_by(name='Product 1').first()
    if not product1:
        product1 = Product(user_id=user1.id, name='Product 1', description='This is product 1', price=9.99)
        db.session.add(product1)
        db.session.commit()  # Commit immediately to ensure we have an ID for product1

    product2 = Product.query.filter_by(name='Product 2').first()
    if not product2:
        product2 = Product(user_id=user2.id, name='Product 2', description='This is product 2', price=19.99)
        db.session.add(product2)
        db.session.commit()  # Commit immediately to ensure we have an ID for product2

    # Create some orders
    order1 = Order.query.filter_by(user_id=user1.id, product_id=product1.id).first()
    if not order1:
        order1 = Order(user_id=user1.id, product_id=product1.id, quantity=1)
        db.session.add(order1)

    order2 = Order.query.filter_by(user_id=user2.id, product_id=product2.id).first()
    if not order2:
        order2 = Order(user_id=user2.id, product_id=product2.id, quantity=2)
        db.session.add(order2)

    # Commit the changes to the database
    db.session.commit()
