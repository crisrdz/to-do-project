import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Role from '../models/Role.js'
import {SECRET_KEY} from '../config.js'

export const registerUser = async (req, res) => {
  try {
    const {username, email, passwordOne, roles} = req.body

    const user = new User({
      username,
      email,
      password: await User.encryptPassword(passwordOne),
      enabled: true
    })

    if(roles){
      const findRoles = await Role.find({name: {$in: roles}})
      user.roles = findRoles.map(role => role._id)    
    }else{
      const role = await Role.findOne({name: "user"})
      user.roles = [role._id]
    }

    const savedUser = await user.save()

    const token = jwt.sign({id: savedUser._id}, SECRET_KEY, {
      expiresIn: 60 * 60 * 24
    })

    res.json({
      success: true,
      token
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if (!user) {
      return res.status(500).json({
        success: false,
        errors: [{
          msg: "Correo electrónico o contraseña incorrecta",
          param: "email"
        }]
      })
    }

    if(!await User.comparePasswords(password || "", user.password)){
      return res.status(500).json({
        success: false,
        errors: [{
          msg: "Correo electrónico o contraseña incorrecta",
          param: "email"
        }]
      })
    }

    const token = jwt.sign({id: user._id}, SECRET_KEY, {
      expiresIn: 60 * 60 * 24
    })

    res.json({
      success: true,
      token
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}