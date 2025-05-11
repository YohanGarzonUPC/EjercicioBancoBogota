# Banco Bogotá - Proyecto Practicas

Este proyecto es una aplicación web para la gestión y registro de practicantes, desarrollada con **Angular** (frontend) y **Flask** (backend).

---

## Requisitos previos

- Python
- Node.js
- npm (incluido con Node.js)
- pip (incluido con Python)

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd EjercicioBancoBogota
```

---

### 2. Backend (Flask)

#### a. Instalar dependencias

```bash
cd backend

pip install -r requirements.txt
```

#### b. Configuración

- Edita el archivo `backend/config.py` si necesitas cambiar la configuración de la base de datos o la carpeta de uploads.

#### c. Ejecutar el backend

```bash
python app.py
```

El backend estará disponible en: [http://localhost:5000]

> **Nota:** No es necesario crear las tablas manualmente. La primera vez que ejecutes el backend, las tablas de la base de datos se crearán automáticamente.

---

### 3. Frontend (Angular)

#### a. Instalar dependencias

```bash
cd ../frontend
npm install
```

#### b. Ejecutar el frontend

```bash
ng serve
```

El frontend estará disponible en: [http://localhost:4200]

---

## Notas

- El backend utiliza SQL por defecto y almacena los archivos PDF en la carpeta `backend/uploads`.
- Asegúrate de que ambos servidores (frontend y backend) estén corriendo para el funcionamiento completo.
- Si necesitas cambiar los puertos o rutas, revisa la configuración en ambos proyectos.

---

## Estructura del proyecto

```
EjercicioBancoBogota/
│
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── requirements.txt
│   └── uploads/
│
├── frontend/
│   ├── src/
│   ├── angular.json
│   └── ...
│
└── README.md
```

---

