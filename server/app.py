import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS
from models import db, User
import logging
from logging.handlers import RotatingFileHandler

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this!



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

    from routes import main_routes
    app.register_blueprint(main_routes)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5555)

if not app.debug:
    if not os.path.exists('logs'):
        os.mkdir('logs')
    file_handler = RotatingFileHandler('logs/echoecho.log', maxBytes=10240, backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)

    app.logger.setLevel(logging.INFO)
    app.logger.info('Echoecho startup')

@main_routes.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"error": "Missing JSON in request"}), 400

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or "@" not in email:
        return jsonify({"error": "Invalid email address"}), 400
    if not password:
        return jsonify({"error": "Missing password"}), 400

    user = User.query.filter_by(email=email).first()
    if user is None or not user.check_password(password):
        return jsonify({'error': 'Invalid email or password'}), 401

    # Create the tokens we will be sending back to the user
    access_token = create_access_token(identity=email)

    # Return the tokens in the response
    return jsonify(access_token=access_token), 200

@main_routes.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
