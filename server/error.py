class UnexpectedError(Exception):
    pass

from functools import wraps

def unexpected_error(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as e:
            print(e)
            raise UnexpectedError from e
    return decorated_function
