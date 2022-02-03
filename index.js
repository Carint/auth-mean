const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// Crear el servidor/aplicación de express
const app = express();

// Conexión a la base de datos
dbConnection();

// Middleware: directorio publico
app.use(express.static('public'));

// Middleware: CORS, se puede config si se deseara solo peticiones de un dominio en especifico
app.use(cors())

// Middleware: Lectura y parseo del body
app.use(express.json());

// Middleware: Rutas del servidor/aplicación
app.use('/api/auth', require('./routes/auth.routes'));

app.listen( process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});
