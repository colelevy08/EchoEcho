from models import db, User, Product, Order, Review
from app import create_app

app = create_app()

with app.app_context():
    # Empty the database before seeding
    meta = db.metadata
    for table in reversed(meta.sorted_tables):
        print(f'Clear table {table}')
        db.session.execute(table.delete())
    db.session.commit()

    # Create users
    usernames = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Charlie Green"]
    emails = ["john@example.com", "jane@example.com", "alice@example.com", "bob@example.com", "charlie@example.com"]
    passwords = ["passwordJohn", "passwordJane", "passwordAlice", "passwordBob", "passwordCharlie"]
    for i in range(5):
        user = User.query.filter_by(username=usernames[i]).first()
        if user is None:
            user = User(username=usernames[i], email=emails[i])
            user.set_password(passwords[i])
            db.session.add(user)
    db.session.commit()

    # Create products
    product_names = ["Apple Macbook Pro", "Samsung Galaxy S20", "HP Spectre x360", "Canon EOS 5D", "Sony WH-1000XM4"]
    product_descriptions = ["16-inch MacBook Pro", "Smartphone with 120Hz Display", "Convertible Laptop", "Professional DSLR", "Noise-Canceling Headphones"]
    product_prices = [2399.99, 999.99, 1349.99, 2599.99, 349.99]
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
            review = Review(user_id=user.id, product_id=product.id, body=f"This product is amazing! - {user.username}", rating=5)
            db.session.add(review)
            user.likes.append(product)
    db.session.commit()
