from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

# Association table for the many-to-many relationship between users and products
likes = db.Table('likes',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('product_id', db.Integer, db.ForeignKey('product.id'))
)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    # Define a many-to-many relationship between users and products (likes)
    likes = db.relationship('Product', secondary=likes, backref=db.backref('liked_by', lazy='dynamic'))

    def set_password(self, password):
        if not password or len(password) < 8:
            raise ValueError('Password must be at least 8 characters.')
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash)


    def is_liking(self, product):
        return self.likes.filter(likes.c.product_id == product.id).count() > 0

    def like_product(self, product):
        if not self.is_liking(product):
            self.likes.append(product)

    def unlike_product(self, product):
        if self.is_liking(product):
            self.likes.remove(product)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'likes': [product.id for product in self.likes],
        }

    # Added __repr__ method for easier debugging
    def __repr__(self):
        return f'<User {self.username}>'

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)
    description = db.Column(db.String(120))
    price = db.Column(db.Float)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'liked_by': [user.id for user in self.liked_by],
        }

    # Added __repr__ method for easier debugging
    def __repr__(self):
        return f'<Product {self.name}>'

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    quantity = db.Column(db.Integer)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
        }

    # Added __repr__ method for easier debugging
    def __repr__(self):
        return f'<Order {self.id}>'

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    body = db.Column(db.String(500))
    rating = db.Column(db.Float)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'body': self.body,
            'rating': self.rating,
        }

    # Added __repr__ method for easier debugging
    def __repr__(self):
        return f'<Review {self.id}>'
