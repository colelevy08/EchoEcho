from functools import wraps
from models import db
from flask import jsonify, request
from functools import wraps



class UnexpectedError(Exception):
    pass

def unexpected_error(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as e:
            print(e)
            raise UnexpectedError from e
    return decorated_function

def commit_or_rollback_error(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            result = f(*args, **kwargs)
            db.session.commit()
            return result
        except Exception as e:
            db.session.rollback()
            raise e
    return decorated_function

# Decorator to validate if the request contains JSON data
def validate_json_request(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not request.is_json:
            return jsonify({"error": "Missing JSON in request"}), 400
        return f(*args, **kwargs)
    return decorated_function

# Decorator to validate email and password
def validate_email_password(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        if not email or "@" not in email:
            return jsonify({"error": "Invalid email address"}), 400
        if not password:
            return jsonify({"error": "Missing password"}), 400
        return f(*args, **kwargs)
    return decorated_function