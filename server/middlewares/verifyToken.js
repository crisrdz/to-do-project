import jwt from 'jsonwebtoken'
import {SECRET_KEY} from '../config.js'
import User from '../models/User.js'

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"]

    if(!token){
      return res.status(403).json({
        success: false,
        message: "Token inválido"
      })
    }
    
    const decoded = jwt.verify(token, SECRET_KEY)
    req.userId = decoded.id

    const user = await User.findById(req.userId)

    if(!user){
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      })
    }

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "No autorizado"
    })
  }
}