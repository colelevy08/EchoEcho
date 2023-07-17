from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS
from models import db, User

def create_app():
    app = Flask(__name__)  # Create Flask application
    CORS(app)  # Enable CORS

    # Set Flask application configurations
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///echoecho.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your-secret-key'  # Replace with a strong secret key

    db.init_app(app)  # Initialize SQLAlchemy with Flask app
    migrate = Migrate(app, db)  # Initialize Flask-Migrate

    login = LoginManager()  # Initialize Flask-Login
    login.init_app(app)

    @login.user_loader
    def load_user(id):
        return User.query.get(int(id))  # Set user_loader callback for Flask-Login

    # Import routes and register with Flask app
    from routes import main_routes
    app.register_blueprint(main_routes)

    

    return app  # Return the initialized Flask app

if __name__ == '__main__':
    app = create_app()  # Create the Flask app
    app.run(debug=True, port=5555)  # Start the Flask app
