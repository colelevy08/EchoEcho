from models import db, User, Product, Order, Review
from app import create_app
from faker import Faker
import random
from datetime import datetime

app = create_app()
fake = Faker()

# Number of users to create
num_users = 5

with app.app_context():
    # Empty the database before seeding
    meta = db.metadata
    for table in reversed(meta.sorted_tables):
        print(f'Clear table {table}')
        db.session.execute(table.delete())
    db.session.commit()

    # Create users
    users = []
    for _ in range(num_users):
        first_name = fake.first_name()
        last_name = fake.last_name()
        username = fake.user_name()
        email = username + "@" + fake.free_email_domain()
        password = fake.password(length=10, special_chars=True, digits=True, upper_case=True, lower_case=True)
        shipping_address = fake.address()
        user = User(first_name=first_name, last_name=last_name, username=username, email=email, shipping_address=shipping_address)
        user.set_password(password)
        db.session.add(user)
        users.append(user)
    db.session.commit()

    # Create products
    products_data = [
        ("Victrola TurnTable", "Record player from 1985 from Victrola", 2399.99, "/static/record_player.png"),
        ("Beatles White Album, Original", "Original copy of The Beatles White Album on vinyl", 999.99, "/static/beatles_album.png"),
        ("Blue Yeti Microphone", "High quality microphone for home studio recording", 1349.99, "/static/blue_yeti.png"),
        ("Kendrick Lamar's 'To Pimp a Butterfly' on Vinyl", "President Obama's Favorite Kendrick Album on vinyl!", 2599.99, "/static/kendrick_vinyl.png"),
        ("Les Paul Guitar", "Used Les Paul Guitar. Plays like a dream. Color - Red", 349.99, "/static/les_paul.png"),
        ("Vintage Headphones", "Classic over-ear headphones with leather cushions", 149.99, "/static/headphones.png"),
        ("Studio Monitor Speakers", "Professional studio monitor speakers for mixing", 699.99, "/static/speakers.png"),
        ("Digital Audio Workstation", "Complete recording studio software package", 499.99, "/static/daw.png"),
        ("MIDI Keyboard Controller", "49-key MIDI keyboard with touch-sensitive pads", 199.99, "/static/midi_keyboard.png"),
        ("USB Audio Interface", "Compact USB audio interface with preamps", 99.99, "/static/audio_interface.png"),
    ]
    products = [Product(name=name, description=desc, price=price, image_url=image_url, stock_quantity=random.randint(1, 100)) for name, desc, price, image_url in products_data]
    db.session.add_all(products)
    db.session.commit()

    # Create orders, reviews, and likes
    for _ in range(10): # 10 orders and reviews
        user = random.choice(users)
        product = random.choice(products)
        
        # Create order
        order = Order(user_id=user.id, product_id=product.id, quantity=random.randint(1, 5), status='Pending', shipping_address=user.shipping_address)
        db.session.add(order)

        # Create review
        review = Review(user_id=user.id, product_id=product.id, comment=fake.text(max_nb_chars=200), rating=random.randint(1, 5), date_posted=datetime.utcnow())
        db.session.add(review)

        # Add product to likes
        user.likes.append(product)
    db.session.commit()
