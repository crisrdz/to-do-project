import User from '../models/User.js'
import {body, validationResult} from 'express-validator'

export const validateUsernameAndEmail = async (req, res, next) => {
  const {email, username} = req.body
  const user = await User.findOne({$or: [{email}, {username}]})

  if(user){
    return res.status(500).json({
      success: false,
      errors: [{
        value: email,
        msg: "Nombre de usuario o correo electrónico ya se encuentra en uso",
        param: "email"
      }]
    })
  }

  next()
}

export const validatePasswordOld = async (req, res, next) => {
  const {passwordOld} = req.body
  const user = await User.findById(req.userId)

  if(! await User.comparePasswords(passwordOld || "", user.password)){
    return res.status(403).json({
      success: false,
      errors: [{
        value: passwordOld,
        msg: "La contraseña es incorrecta",
        param: "passwordOld"
      }]
    })
  }

  next()
}

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
    body("username", "Ingrese un nombre de usuario válido")
      .exists()
      .isLength({min: 8})
      .withMessage("El nombre de usuario debe tener por lo menos 8 caracteres")
      .isAlpha('es-ES')
      .withMessage("El nombre de usuario solo debe contener letras"),
    body("email", "Ingrese un email válido")
      .exists()
      .isEmail(),
    body("passwordOne", "Ingrese una contraseña válida")
      .exists()
      .isStrongPassword()
      .withMessage("La contraseña debe tener por lo menos 8 caracteres, además debe contener por lo menos 1 letra minúscula, 1 letra mayúscula, 1 número y 1 símbolo"),
    body("passwordTwo")
      .exists()
      .custom((value, {req}) => {
        if(value !== req.body.passwordOne) {
          throw new Error("Las contraseñas no coinciden")
        }
        return true
      }),
    body("roles")
      .optional()
      .isIn(["user", "admin", "moderator"])
      .withMessage("Ingrese un rol válido"),
    body("passwordOld")
      .optional()
  ]
}