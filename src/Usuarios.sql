-- Seleccionar la base de datos o crearla si aún no existe
CREATE DATABASE IF NOT EXISTS desarrolloSQL;
USE desarrolloSQL;

-- Crear la tabla 'usuarios' si no existe
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(255) NOT NULL,
    contrasena VARCHAR(512) NOT NULL
);