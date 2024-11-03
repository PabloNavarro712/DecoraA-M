// backend/server.js
const express = require('express');
const cors = require('cors');
const galeriaRoutes = require('./routes/galeria');
const uploadRoutes = require('./routes/upload');
const servicios=require('./routes/servicios');
const eventos=require('./routes/eventos');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Usar las rutas importadas
app.use('/api/galeria-prueba', galeriaRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/servicios', servicios);
app.use('/api/eventos',eventos);
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
