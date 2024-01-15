const axios = require("axios");

function setup(app) {

  app.get("/juegos", async (req, res) => {
    try {
      const response = await axios.get("https://www.freetogame.com/api/games");
      res.json(response.data);
    } catch (error) {
      console.error("Error al obtener los datos de la API:", error.message);
      res.status(500).send("Error interno del servidor");
    }
  });

  app.get("/juegos/:id", async (req, res) => {
    try {
      // Obtener el ID de los parámetros de la ruta
      const gameId = req.params.id;

      // Construir la URL con el ID proporcionado
      const apiUrl = `https://www.freetogame.com/api/game?id=${gameId}`;

      // Realizar la solicitud a la API con la URL construida
      const response = await axios.get(apiUrl);

      // Enviar la respuesta JSON de la API al cliente
      res.json(response.data);
    } catch (error) {
      console.error("Error al obtener los datos de la API:", error.message);
      res.status(500).send("Error interno del servidor");
    }
  });

  // Nueva ruta para obtener juegos por plataforma
  app.get("/juegos/plataforma/:plataforma", async (req, res) => {
    try {
      const platform = req.params.plataforma;
      const apiUrl = `https://www.freetogame.com/api/games?platform=${platform}`;
      const response = await axios.get(apiUrl);
      res.json(response.data);
    } catch (error) {
      console.error("Error al obtener los datos de la API:", error.message);
      res.status(500).send("Error interno del servidor");
    }
  });

}

module.exports = {
  setup,
};
