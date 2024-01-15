
# GAME HEAVEN

Bienvenido a la pagina web sobre videojuegos mas novedosa de internet! Aqui podras encontrar y opinar sobre todo tipo de juegos.

## Tecnologias usadas

**Cliente:** HTML, CSS, JavaScript

**Server:** Node, Express, Flask


## Instalación

Descargar zip

Instalar dependencias desde la carpeta API/BBDD

```bash
  npm install
```

Instalar el fichero 'requirements.txt' en la carpeta principal

```bash
  pip freeze > requirements.txt
```

```bash
  pip install -r requirements.txt
```

Tener instalado MySQL y MongoDB para que la conexion se haga correctamente (para MySQL, usar el archivo Usuarios.sql)

## Ejecucion final

Lanzamos los 3 servidores, en este orden

En el directorio de API/BBDD

```bash
  node opiniones.js
```

```bash
  node app.js
```

En el directorio general

```bash
  python app.py
```
