const { response, request } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

// Inicio de sesión
const login = async (req = request, res = response) => {  
  const { email, password } = req.body;

  try {
    const dbUser = await User.findOne({ email });

    if (!dbUser) {
      return res.status(400).json({
        status: false,
        message: 'Credenciales del usuario no son válidas'
      })
    }

    // Verificación de la contraseña
    const validatePassword = bcrypt.compareSync(password, dbUser.password);

    if (!validatePassword) {
      return res.status(400).json({
        status: false,
        message: 'Credenciales del usuario no son válidas'
      })
    }

    // Generar el JWT
    const token = await generateJWT(dbUser.id, dbUser.name);

    // Respuesta existosa
    return res.status(201).json({
      status: true,
      uid: dbUser.id,
      name: dbUser.name,
      token
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: 'Ha ocurrido un error, contactar al administrador!'
    })
  }
}

// Creación de un nuevo usuario
const newUser = async (req = request, res = response) => {
  const { name, email, password } = req.body;
  
  try {
    // Verificar si existe el correo
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        status: false,
        message: 'Ya existe un usuario con este correo electrónico'
      });
    }

    // Crear el usuario con el modelo
    const dbUser = new User(req.body);

    // Hash a la contraseña
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password, salt);

    // Generar el JWT
    const token = await generateJWT(dbUser.id, name);

    // Crear usuario en BD
    await dbUser.save();

    // Respuesta existosa
    return res.status(201).json({
      status: true,
      uid: dbUser.id,
      name: dbUser.name,
      token
    })    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: 'Ha ocurrido un error, contactar al administrador!'
    })
  }
}

// Validación del token
const validateToken = async (req = request, res = response) => {
  const { userId, userName } = req;

  try {
    // Generar el JWT
    const token = await generateJWT(userId, userName);

    // Respuesta exitosa
    return res.json({
      status: true,
      uid: userId,
      name: userName,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: 'Ha ocurrido un error, contactar al administrador!'
    })
  }
}

module.exports = {
 newUser,
 login,
 validateToken
}