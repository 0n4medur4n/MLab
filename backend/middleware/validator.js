const { validationResult, check } = require("express-validator");

const validateContact = [
  check("firstName")
    .trim()
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage("El nombre solo puede contener letras"),

  check("lastName")
    .trim()
    .notEmpty()
    .withMessage("El apellido es requerido")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage("El apellido solo puede contener letras"),

  check("email")
    .trim()
    .notEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .normalizeEmail(),

  check("phone")
    .trim()
    .notEmpty()
    .withMessage("El teléfono es requerido")
    .matches(/^[0-9+\s-()]+$/)
    .withMessage("Formato de teléfono inválido"),

  check("message")
    .trim()
    .notEmpty()
    .withMessage("El mensaje es requerido")
    .isLength({ min: 10, max: 1000 })
    .withMessage("El mensaje debe tener entre 10 y 1000 caracteres"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateContact,
};
