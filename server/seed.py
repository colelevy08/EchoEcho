from models import db, User, Product, Order, Review
from app import create_app
from faker import Faker
import random
from datetime import datetime


app = create_app()
fake = Faker()

# Number of records to create for each model
num_records = 10

with app.app_context():
    # Empty the database before seeding
    meta = db.metadata
    for table in reversed(meta.sorted_tables):
        print(f'Clear table {table}')
        db.session.execute(table.delete())
    db.session.commit()

    # Create users
    users = []
    for _ in range(num_records):
        username = fake.name()
        email = fake.email()
        password = fake.password(length=10, special_chars=True, digits=True, upper_case=True, lower_case=True)
        first_name = fake.first_name() # Added first name
        last_name = fake.last_name() # Added last name
        address = fake.address() # Added address
        user = User.query.filter_by(username=username).first()
        if user is None:
            user = User(username=username, email=email, first_name=first_name, last_name=last_name, address=address) # Included first_name, last_name, and address
            user.set_password(password)
            db.session.add(user)
            users.append(user)
    db.session.commit()

    # Create products
    product_names = ["Victrola TurnTable", "Beatles White Album, Original", "Blue Yeti Microphone", "Kendrick Lamar's 'To Pimp a Butterfly' on Vinyl", "Les Paul Guitar"]
    product_descriptions = ["Record player from 1985 from Victrola", "Original copy of The Beatles White Album on vinyl", "High quality microphone for home studio recording", "President Obama's Favorite Kendrick Album on vinyl!", "Used Les Paul Guitar. Plays like a dream. Color - Red"]
    product_prices = [2399.99, 999.99, 1349.99, 2599.99, 349.99]
    product_images = ["/static/record_player.png", "/static/beatles_album.png", "/static/blue_yeti.png", "/static/kendrick_vinyl.png", "/static/les_paul.png"]
    products = []
    for i in range(5):
        stock_quantity = random.randint(1, 100)
        product = Product(name=product_names[i], description=product_descriptions[i], price=product_prices[i], image_url=product_images[i], stock_quantity=stock_quantity)
        db.session.add(product)
        products.append(product)
    db.session.commit()

    # Create orders, reviews, and likes
    for i in range(num_records):
        user = users[i]
        for j in range(5):
            product = products[j]
            # Create order
            quantity = random.randint(1, 5)
            status = 'Pending'
            shipping_address = user.address # Using user's address as shipping address
            order = Order(user_id=user.id, product_id=product.id, quantity=quantity, status=status, shipping_address=shipping_address) # Included shipping_address
            db.session.add(order)

            # Create review
            comment = fake.text(max_nb_chars=200)
            rating = random.randint(1, 5)
            date_posted = datetime.utcnow() # Current date and time
            review = Review(user_id=user.id, product_id=product.id, comment=comment, rating=rating, date_posted=date_posted) # Included date_posted
            db.session.add(review)

            # Add product to likes
            user.likes.append(product)
    db.session.commit()
