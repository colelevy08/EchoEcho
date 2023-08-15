from functools import wraps
from models import db

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
