from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS
from models import db, User
from routes import initialize_routes

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///echoecho.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key'  # Please replace this with a strong secret key

migrate = Migrate(app, db)
db.init_app(app)

login = LoginManager()
login.init_app(app)

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

initialize_routes(app)  # Initialize routes from routes.py

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database if it doesn't exist
    app.run(debug=True, port=5555)
