from models import db, User, Product, Order, Review
from app import create_app
from faker import Faker
import random

app = create_app()
fake = Faker()

# Number of records to create for each model
num_records = 10

with app.app_context():
    session = db.session
    # Empty the database before seeding
    meta = db.metadata
    for table in reversed(meta.sorted_tables):
        print(f'Clear table {table}')
        db.session.execute(table.delete())
    db.session.commit()

    # Create users
    for _ in range(num_records):
        username = fake.name()
        email = fake.email()
        password = fake.password(length=10, special_chars=True, digits=True, upper_case=True, lower_case=True)
        user = User.query.filter_by(username=username).first()
        if user is None:
            user = User(username=username, email=email)
            user.set_password(password)
            db.session.add(user)
    db.session.commit()

    # Create products
    product_names = ["Victrola TurnTable", "Beatles White Album, Original", "Blue Yeti Microphone", "Kendrick Lamar's 'To Pimp a Butterfly' on Vinyl", "Les Paul Guitar"]
    product_descriptions = ["Record player from 1985 from Victrola", "Original copy of The Beatles White Album on vinyl", "High quality microphone for home studio recording", "President Obama's Favorite Kendrick Album on vinyl!", "Used Les Paul Guitar. Plays like a dream. Color - Red"]
    product_prices = [2399.99, 999.99, 1349.99, 2599.99, 349.99]
    for i in range(5):
        product = Product(name=product_names[i], description=product_descriptions[i], price=product_prices[i], image_url="/static/record_player.png")
        db.session.add(product)
    db.session.commit()

    # Create orders, reviews, and likes
    for user_id in range(1, num_records + 1):
        user = session.get(User, user_id)  # Use the session variable
        if user is not None:
            for product_id in range(1, random.randint(2, num_records + 1)):  # Each user interacts with 1 to num_records products
                product = session.get(Product, product_id)  # Use the session variable
                if product is not None:
                    # Create order
                    quantity = random.randint(1, 5)
                    order = Order(user_id=user_id, product_id=product_id, quantity=quantity)
                    db.session.add(order)

                    # Create review
                    body = fake.text(max_nb_chars=200)
                    rating = random.randint(1, 5)
                    review = Review(user_id=user_id, product_id=product_id, body=body, rating=rating)
                    db.session.add(review)

                    # Add product to likes
                    user.likes.append(product)
    db.session.commit()
