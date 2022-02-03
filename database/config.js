const mongoose = require('mongoose');

const dbConnection = async() => {
  try {
    // Conexion a la base de datos
    await mongoose.connect(process.env.BD_CNN)

    // Conexión exitosa
    console.log('Base de datos en linea');
  } catch (error) {
    console.log(error);
    throw new Error('Error en conexión a base de datos!')
  }
}

module.exports = {
  dbConnection
}
