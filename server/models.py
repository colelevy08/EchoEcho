from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

likes = db.Table('likes',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('product_id', db.Integer, db.ForeignKey('product.id'))
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(60), nullable=False)
    first_name = db.Column(db.String(50), nullable=True)
    last_name = db.Column(db.String(50), nullable=True)
    address = db.Column(db.String(200), nullable=True)
    orders = db.relationship('Order', backref='user', lazy=True)
    likes = db.relationship('Product', secondary=likes, backref='liked_by')

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def like_product(self, product):
        self.likes.append(product)
    
    def unlike_product(self, product):
        self.likes.remove(product)

    def is_liking(self, product):
        return product in self.likes

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'address': self.address,
        }

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String, nullable=True)  # Added image_url field
    stock_quantity = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(50), nullable=True)
    orders = db.relationship('Order', backref='product', lazy=True)

    def __repr__(self):
        return f"Product('{self.name}', '{self.description}', '{self.price}')"

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'image_url': self.image_url,
            'stock_quantity': self.stock_quantity,
            'category': self.category,
        }

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(50), nullable=False, default='Pending')
    is_active = db.Column(db.Boolean, default=True)


    def __repr__(self):
        return f"Order('{self.product_id}', '{self.user_id}', '{self.quantity}')"

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'user_id': self.user_id,
            'quantity': self.quantity,
            'status': self.status,
        }

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(200), nullable=True)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Review('{self.product_id}', '{self.user_id}', '{self.rating}', '{self.comment}')"

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'user_id': self.user_id,
            'rating': self.rating,
            'comment': self.comment,
            'date_posted': self.date_posted,
        }
