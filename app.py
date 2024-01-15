from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_mysqldb import MySQL
import hashlib  # Para hashear contraseñas
import requests # Para las request a los links de node
import json
import webbrowser

app = Flask(__name__)

# Configuración de la base de datos
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'desarrollosql'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'  # Para obtener resultados como diccionarios
mysql = MySQL(app)

# Función para verificar la conexión a la base de datos
def check_db_connection():
    with app.app_context():
        try:
            cursor = mysql.connection.cursor()
            cursor.execute('SELECT 1')  # Hacer una consulta simple
            cursor.close()
            return True
        except Exception as e:
            print(f"Error al conectar con la base de datos: {e}")
            return False

# Verificar la conexión antes de iniciar la aplicación Flask
if check_db_connection():
    print("Conexión a la base de datos establecida correctamente")
else:
    print("Error al conectar con la base de datos. Verifica la configuración.")

# Configuración de la clave secreta para sesiones
app.secret_key = 'trabajoDesarrollo'

# Función para hashear contraseñas
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# Ruta para el registro de usuarios
@app.route('/registro', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Hashear la contraseña antes de almacenarla en la base de datos
        hashed_password = hash_password(password)

        # Verificar si el usuario ya existe
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM usuarios WHERE nombre = %s", (username,))
        existing_user = cursor.fetchone()

        if existing_user:
            cursor.close()
            print(f"No se puede registrar. El nombre de usuario '{username}' ya existe.")
            return render_template('Registro.html', registration_error="El nombre de usuario ya está registrado.")

        # Guardar el usuario en la base de datos
        cursor.execute("INSERT INTO usuarios (nombre, contrasena) VALUES (%s, %s)", (username, hashed_password))
        mysql.connection.commit()
        cursor.close()

        session['username'] = username  # Iniciar sesión automáticamente después del registro
        print(f"Usuario '{username}' registrado correctamente.")

        # Configurar mensaje de bienvenida para la página de inicio después del registro
        session['login_welcome_message'] = f"Bienvenido, {username}! Has sido registrado exitosamente."

        # Redirigir a la página de inicio después del registro
        return redirect(url_for('inicio'))

    return render_template('Registro.html')


# Ruta para el inicio de sesión
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Hashear la contraseña para compararla con la almacenada en la base de datos
        hashed_password = hash_password(password)

        # Verificar las credenciales en la base de datos
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM usuarios WHERE nombre = %s AND contrasena = %s", (username, hashed_password))
        user = cursor.fetchone()
        cursor.close()

        # Imprimir en la consola si el usuario ha sido encontrado o no
        if user:
            print(f"Usuario '{username}' encontrado en la base de datos.")
            session['username'] = username

            # Configurar mensaje de bienvenida para la página de inicio después del inicio de sesión
            session['login_welcome_message'] = f"Bienvenido de nuevo, {username}!"

            # Redirigir a la página de inicio después del inicio de sesión
            return redirect(url_for('inicio'))
        else:
            print(f"Usuario '{username}' no encontrado en la base de datos.")
        
    return render_template('Login.html')

# Ruta para cerrar sesión
@app.route('/logout')
def logout():
    # Eliminar la información de la sesión
    session.pop('username', None)
    return redirect(url_for('login'))

# Ruta para el inicio
@app.route('/inicio')
def inicio():
    if 'username' in session:
        username = session['username']
        print(f"Usuario autenticado: {username}")

        # Verificar si hay un mensaje de bienvenida después de inicio de sesión
        welcome_message = session.pop('login_welcome_message', None)

        return render_template('Inicio.html', username=username, welcome_message=welcome_message)
    else:
        return redirect(url_for('login'))

# Ruta para la página de detalles del juego
@app.route('/juego/<int:juego_id>')
def juego(juego_id):
    if 'username' in session:
        # Hacer una solicitud para obtener la información específica del juego desde la API
        api_url = f'http://localhost:3000/juegos/{juego_id}'  # Ajusta la URL real de tu API
        response = requests.get(api_url)

        if response.status_code == 200:
            try:
                juego = response.json()
                username = session['username']
                return render_template('Juego.html', juego=juego, username=username)
            except json.JSONDecodeError as e:
                error_message = f"Error al decodificar el JSON: {e}. Contenido de la respuesta: {response.text}"
                return render_template('Error.html', message=error_message)
        else:
            error_message = f"Error al obtener información del juego desde la API. Código de estado: {response.status_code}. Contenido de la respuesta: {response.text}"
            return render_template('Error.html', message=error_message)
    else:
        return redirect(url_for('login'))


if __name__ == '__main__':
    # Abre la aplicación en un navegador solo en el proceso principal
    if not app.debug or os.environ.get('WERKZEUG_RUN_MAIN') == 'true':
        webbrowser.open('http://localhost:4000/login')

    # Inicia el servidor Flask
    app.run(debug=True, port=4000, use_reloader=False)



    
