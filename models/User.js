const { Schema, model } = require("mongoose");

// Modelo para tener interacción con la base de datos de mongoose
const UserSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = model('User', UserSchema);
