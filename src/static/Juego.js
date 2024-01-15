document.addEventListener("DOMContentLoaded", function () {
    // Obtener el parámetro "id" de la URL
    const pathSegments = window.location.pathname.split('/');
    const juegoId = pathSegments[pathSegments.length - 1];

    // Hacer una solicitud para obtener la información específica del juego
    fetch(`http://localhost:3000/juegos/${juegoId}`)
        .then(response => response.json())
        .then(juego => {
            // Actualizar el contenido de la página con la información del juego
            document.getElementById("juego-imagen").src = juego.thumbnail;
            document.getElementById("juego-titulo").innerText = juego.title;
            document.getElementById("juego-genero").innerText = juego.genre;
            document.getElementById("juego-plataforma").innerText = juego.platform;
            document.getElementById("juego-descripcion").innerText = juego.description;
        })
        .catch(error => console.error("Error al obtener la información del juego:", error));

    const opinionForm = document.getElementById("opinion-form");

    opinionForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const comentarioInput = document.getElementById("comentario");
        const opinion = comentarioInput.value;

        // Hacer una solicitud para agregar la opinión
        fetch(`http://localhost:5000/opinion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ opinion, juegoId }),
        })
            .then(response => response.json())
            .then(data => {
                alert("Opinion ingresada correctamente! Esperemos que te haya gustado el juego");
                comentarioInput.value = '';
            })
            .catch(error => console.error("Error al agregar la opinión:", error));
    });
});
