from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS
from models import db, User

def create_app():
    app = Flask(__name__)  # Create a Flask application instance
    CORS(app)  # Enable Cross-Origin Resource Sharing (CORS) with the default parameters

    # Configure the Flask app
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///echoecho.db'  # Set the database URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable the Flask-SQLAlchemy event system
    app.config['SECRET_KEY'] = 'your-secret-key'  # Set the secret key for session cookies

    db.init_app(app)  # Initialize Flask-SQLAlchemy with the Flask app
    migrate = Migrate(app, db)  # Initialize Flask-Migrate for handling database migrations

    login = LoginManager()  # Create a Flask-Login manager instance
    login.init_app(app)  # Initialize Flask-Login with the Flask app

    @login.user_loader
    def load_user(id):
        return User.query.get(int(id))  # Define the callback for reloading a user from the session

    # Import routes and register with the Flask app
    from routes import main_routes
    app.register_blueprint(main_routes)

    return app  # Return the initialized Flask app

if __name__ == '__main__':
    app = create_app()  # Create the Flask app
    app.run(debug=True, port=5555)  # Start the Flask development server
