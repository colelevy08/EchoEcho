from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from models import User
from flask_migrate import Migrate

migrate = Migrate(app, db)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///echoecho.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

login = LoginManager()
login.init_app(app)

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

# Import routes after the db and login manager are initialized
from routes import *

if __name__ == '__main__':
    app.run(debug=True)
