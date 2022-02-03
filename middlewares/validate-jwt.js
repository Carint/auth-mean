const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      status: false,
      message: 'Usuario no autorizado'
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.userId = uid;
    req.userName = name;
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: 'Token no válido'
    })
  }

  next();
}

module.exports = {
  validateJWT
}
