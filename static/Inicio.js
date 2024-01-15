async function verJuegos() {
    const plataformaSeleccionada = document.getElementById("plataforma").value;

    // Construir la URL de la API con el filtro de plataforma
    const url = plataformaSeleccionada === "all" ? "http://localhost:3000/juegos" : `http://localhost:3000/juegos/plataforma/${plataformaSeleccionada}`;

    // Realizar la solicitud a la API con la URL construida
    const response = await fetch(url);
    const juegos = await response.json();

    // Limpiar el contenedor antes de agregar los juegos filtrados
    const contenedorJuegos = document.getElementById("contenedor-juegos");
    contenedorJuegos.innerHTML = "";

    juegos.forEach(juego => {
        // Crear un nuevo div para cada juego
        const juegoDiv = document.createElement("div");
        juegoDiv.classList.add("juego");

        // Crear una imagen y establecer el atributo src
        const imagen = document.createElement("img");
        imagen.src = juego.thumbnail;  // Ajusta esto según la estructura real de tus datos

        // Crear elementos para los otros datos (título, género, plataforma)
        const titulo = document.createElement("div");
        titulo.innerText = `Título: ${juego.title}`;

        const genero = document.createElement("div");
        genero.innerText = `Género: ${juego.genre}`;

        const plataforma = document.createElement("div");
        plataforma.innerText = `Plataforma: ${juego.platform}`;

        // Agregar un evento de clic al div del juego
        juegoDiv.addEventListener("click", () => {
            // Redirigir a la nueva página con el ID del juego como parámetro
            window.location.href = `http://localhost:4000/juego/${juego.id}`; // Reemplaza "id" con el nombre correcto de la propiedad en tus datos
        });

        // Agregar la imagen y los otros datos al div del juego
        juegoDiv.appendChild(imagen);
        juegoDiv.appendChild(titulo);
        juegoDiv.appendChild(genero);
        juegoDiv.appendChild(plataforma);

        // Agregar el div del juego al contenedor principal
        contenedorJuegos.appendChild(juegoDiv);
    });
}

function cerrarSesion() {
    window.location.href = "http://localhost:4000/logout";
    alert("Nos vemos pronto!")
}

document.addEventListener("DOMContentLoaded", function () {
    // Llama a la función verJuegos por defecto al cargar la página
    verJuegos();
});
