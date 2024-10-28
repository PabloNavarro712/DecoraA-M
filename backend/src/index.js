const express = require('express');
const crudRoutes = require('./routes/crudRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', crudRoutes); // Usar las rutas CRUD

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
