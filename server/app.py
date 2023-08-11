from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS
from models import db, User
from routes import register_routes # Import the register_routes function
import os

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    app.config.from_mapping(
        SECRET_KEY=os.getenv('SECRET_KEY', 'your-secret-key'),
        SQLALCHEMY_DATABASE_URI=os.getenv('DATABASE_URL', 'sqlite:///echoecho.db'),
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    db.init_app(app)

    # This makes sure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    migrate = Migrate(app, db)

    login = LoginManager()
    login.init_app(app)

    @login.user_loader
    def load_user(id):
        return User.query.get(int(id))

    # Import and register routes
    register_routes(app) # Call the register_routes function with the app

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists("build/" + path):
            return send_from_directory('build', path)
        else:
            return send_from_directory('build', 'index.html')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5555) # Set the port to 5555
