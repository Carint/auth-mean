const { response, request } = require('express');

const login = (req = request, res = response) => {  
  const { name, email, password } = req.body;

  return res.json({
    status: true,
    message: 'Inicio de sesión'
  })
}

const newUser = (req = request, res = response) => {
  const { name, email, password } = req.body;
  
  return res.json({
    status: true,
    message: 'Creación de un nuevo usuario'
  });
}

const validateToken = (req = request, res = response) => {
  return res.json({
    status: true,
    message: 'Validación del token'
  });
}

module.exports = {
 newUser,
 login,
 validateToken
}