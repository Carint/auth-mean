const { Router } = require('express');
const { check } = require('express-validator');
const { newUser, login, validateToken } = require('../controllers/auth.controller');
const { validateInput } = require('../middlewares/validate-inputs');

const router = Router();

// Inicio de sesión
router.post('/', [
  // Consultar la documentación de express-validator para mayor información
  check('email', 'El correo electrónico no es válido').isEmail(),
  check('password', 'La contraseña no es válida').isLength({ min: 6}),
  validateInput
], login);

// Crear un nuevo usuario
router.post('/new', [
  check('name', 'El nombre no es válido').not().isEmpty(),
  check('email', 'El correo electrónico no es válido').isEmail(),
  check('password', 'La contraseña no es válida').isLength({ min: 6}),
  validateInput
], newUser);

// Validación del token
router.get('/renew', validateToken);

module.exports = router;
