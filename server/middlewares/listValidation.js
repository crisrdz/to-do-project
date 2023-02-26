import {body, validationResult} from 'express-validator'

export const validateFields = (req, res, next) => {
  const errors = validationResult(req).array()

  if(errors.length > 0){
    return res.status(500).json({
      success: false,
      errors
    })
  }

  next()
}

export const validateConfig = () => {
  return [
    body("name", "Ingrese un nombre de lista válido")
      .exists()
      .isLength({min: 3})
      .withMessage("El nombre de la lista debe contener mínimo 3 caracteres"),
    body("completed", "Ingrese un valor válido para la lista completada")
      .optional()
      .isBoolean(),
    body("items", "Ingrese algún ítem válido")
      .exists()
      .isArray()
      .withMessage("Ingrese ítems con un formato válido"),
    body("items[*].completed")
      .exists()
      .isBoolean(),
    body("items[*]['description']", "Ingrese una descripción válida")
      .exists()
      .isLength({min: 3})
      .withMessage("La descripción debe contener mínimo 3 caracteres"),
  ]
}