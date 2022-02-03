const { request, response } = require("express");
const { validationResult } = require("express-validator");

const validateInput = (req = request, res = response, next) => {
  // Validación de errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      message: errors.mapped()
    });
  }

  next();
}

module.exports = { validateInput };
