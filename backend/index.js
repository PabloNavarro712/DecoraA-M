const express = require('express');
const cors = require('cors');
const galeriaRoutes = require('./routes/galeriaRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/galeria-prueba', galeriaRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
