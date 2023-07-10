from app import db
from models import User, Product

# Create some users
user1 = User(username='user1', email='user1@example.com')
user1.set_password('password')
db.session.add(user1)

user2 = User(username='user2', email='user2@example.com')
user2.set_password('password')
db.session.add(user2)

# Create some products
product1 = Product(name='Product 1', description='This is product 1', price=9.99)
db.session.add(product1)

product2 = Product(name='Product 2', description='This is product 2', price=19.99)
db.session.add(product2)

# Commit the changes to the database
db.session.commit()
