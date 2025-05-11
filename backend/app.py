from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename 
from config import Config
import os
app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
jwt = JWTManager(app)
db = SQLAlchemy(app)

# Asegurar que existe el directorio de uploads
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Modelos
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

class Practicante(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    carrera = db.Column(db.String(100), nullable=False)
    semestre = db.Column(db.Integer, nullable=False)
    cv_path = db.Column(db.String(255), nullable=False)
    pasa = db.Column(db.Boolean, nullable=True)

# Rutas
@app.route('/api/registro', methods=['POST'])
def registro():
    try:
        data = request.form
        file = request.files['cv']
        
        if file:
            filename = secure_filename(f"{data['email']}_CV.pdf")
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            
            practicante = Practicante(
                nombre=data['fullName'],
                email=data['email'],
                carrera=data['career'],
                semestre=data['semester'],
                cv_path=filename
            )
            
            db.session.add(practicante)
            db.session.commit()
            
            return jsonify({'message': 'Registro exitoso'}), 201
            
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.json
        user = Usuario.query.filter_by(email=data['email']).first()
        
        if user and user.password == data['password']:
            access_token = create_access_token(identity=user.id)
            return jsonify({'token': access_token}), 200
            
        return jsonify({'error': 'Credenciales inválidas'}), 401
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/practicantes', methods=['GET'])
def obtener_practicantes():
    try:
        practicantes = Practicante.query.all()
        
        if not practicantes:
            return jsonify({'message': 'No hay practicantes registrados', 'data': []}), 200
            
        practicantes_list = []
        for practicante in practicantes:
            practicantes_list.append({
                'id': practicante.id,
                'nombre': practicante.nombre,
                'email': practicante.email,
                'carrera': practicante.carrera,
                'semestre': practicante.semestre,
                'cv_path': practicante.cv_path,
                'pasa': practicante.pasa
            })
            
        return jsonify({
            'message': 'Practicantes encontrados',
            'data': practicantes_list
        }), 200
            
    except Exception as e:
        print(f"Error: {str(e)}")  # Para debug
        return jsonify({'error': str(e)}), 400

@app.route('/api/practicantes/<int:id>/viabilidad', methods=['PUT'])
def actualizar_viabilidad(id):
    try:
        data = request.json
        practicante = Practicante.query.get(id)
        
        if not practicante:
            return jsonify({'error': 'Practicante no encontrado'}), 404
            
        practicante.pasa = data['pasa']
        db.session.commit()
        
        return jsonify({'message': 'Viabilidad actualizada exitosamente'}), 200
            
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 400

@app.route('/api/practicantes/<int:id>', methods=['DELETE'])
def eliminar_practicante(id):
    try:
        practicante = Practicante.query.get(id)
        
        if not practicante:
            return jsonify({'error': 'Practicante no encontrado'}), 404
            
        # Eliminar solo el archivo CV
        cv_path = os.path.join(app.config['UPLOAD_FOLDER'], practicante.cv_path)
        if os.path.exists(cv_path):
            os.remove(cv_path)
            
        # Marcar como no viable
        practicante.pasa = False
        db.session.commit()
        
        return jsonify({'message': 'Practicante marcado como no viable'}), 200
            
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 400

@app.route('/api/download/<filename>', methods=['GET'])
def download_file(filename):
    try:
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Archivo no encontrado'}), 404

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
