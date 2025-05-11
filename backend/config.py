import os
from datetime import timedelta

class Config:
    SECRET_KEY = 'tu_clave_secreta'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost/banco'
    SQLALCHEMY_TRACK_MODIFICATIONS = False 
    JWT_SECRET_KEY = 'jwt-secret-key'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')