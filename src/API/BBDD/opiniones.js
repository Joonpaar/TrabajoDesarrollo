const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

const mongoURL = 'mongodb://127.0.0.1:27017/Desarrollo';

// Habilitar CORS
app.use(cors());
app.use(bodyParser.json());

// Endpoint para agregar datos a la colección
app.post('/opinion', async (req, res) => {
    try {
        const { opinion, juegoId } = req.body;

        if (!opinion || !juegoId) {
            return res.status(400).json({ error: 'Los campos "opinion" o "juegoId" son obligatorios.' });
        }

        const client = await MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
        const collection = client.db().collection('Opiniones');

        // Insertar opinion en la colección
        await collection.insertOne({ opinion, juegoId });

        client.close();
        return res.status(201).json({ mensaje: 'Opinion agregada correctamente.' });
    } catch (error) {
        console.error(`Error al agregar la opinion: ${error}`);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
