import Role from '../models/Role.js'
import User from '../models/User.js'

export const getUsers = async (req, res) => {
  try {
    const { page } = req.query
    const limit = 6

    const mod = await User.findById(req.userId).populate(
      {
        path: "roles",
        select: {
          name: 1,
          _id: 0
        }
      }
    )
    
    if(!mod.roles.find(role => role.name === "moderator")){
      return res.status(401).json({
        success: false,
        message: "No autorizado"
      })
    }

    const adminRole = await Role.findOne({name: "admin"})

    const users = await User.find({_id: {$ne: req.userId}, roles: {$ne: adminRole._id}}, { password: 0}).populate(
      {
        path: "roles",
        select: {
          name: 1,
          _id: 0
        }
      }).populate("listCount").limit(limit).skip(limit * (page - 1))

    res.json({
      success: true,
      users
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getUser = async (req, res) => {
  try {
    let user = await User.findById(req.userId, { password: 0}).populate(
      {
        path: "roles",
        select: {
          name: 1,
          _id: 0
        }
      }).populate("listCount")

    const { _id, id, ...cleanedUser} = user.toObject()

    res.json({
      success: true,
      user: cleanedUser
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const updateUser = async(req, res) => {
  try {
    const {username, email, passwordOne, roles} = req.body

    let user = await User.findByIdAndUpdate(req.userId, {
      username,
      email,
      password: await User.encryptPassword(passwordOne)
    }, {
      new: true,
      select: {
        password: 0
      }
    })

    if(roles){
      const userRoles = await Role.find({name: {$in: roles}})
      user.roles = userRoles.map(role => role._id)
      user = await user.save()
    }

    res.json({
      success: true,
      user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const disableUser = async(req, res) => {
  try {
    const {userId} = req.body

    const mod = await User.findById(req.userId).populate(
      {
        path: "roles",
        select: {
          name: 1,
          _id: 0
        }
      }
    )
    
    if(!mod.roles.find(role => role.name === "moderator")){
      return res.status(401).json({
        success: false,
        message: "No autorizado"
      })
    }

    let user = await User.findById(userId)

    if(!user){
      return res.status(404).json({
        success: false,
        message: "Usuario a deshabilitar no encontrado"
      })
    }

    user.enabled = false

    await user.save()

    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const enableUser = async(req, res) => {
  try {
    const {userId} = req.body

    const mod = await User.findById(req.userId).populate(
      {
        path: "roles",
        select: {
          name: 1,
          _id: 0
        }
      }
    )
    
    if(!mod.roles.find(role => role.name === "moderator")){
      return res.status(401).json({
        success: false,
        message: "No autorizado"
      })
    }

    let user = await User.findById(userId)

    if(!user){
      return res.status(404).json({
        success: false,
        message: "Usuario a habilitar no encontrado"
      })
    }

    user.enabled = true

    await user.save()

    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const changeRole = async(req, res) => {
  try {
    const {userId} = req.body

    const admin = await User.findById(req.userId).populate(
      {
        path: "roles",
        select: {
          name: 1,
          _id: 0
        }
      }
    )
    
    if(!admin.roles.find(role => role.name === "admin")){
      return res.status(401).json({
        success: false,
        message: "No autorizado"
      })
    }

    let user = await User.findById(userId)

    if(!user){
      return res.status(404).json({
        success: false,
        message: "Usuario a habilitar no encontrado"
      })
    }

    const adminRole = await Role.findOne({name: "moderator"})
    
    if(user.roles.includes(adminRole._id)){
      const index = user.roles.indexOf(adminRole._id)
      user.roles.splice(index, 1)
    }else{
      user.roles.unshift(adminRole._id)
    }

    await user.save()

    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}