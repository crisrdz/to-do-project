import Role from '../models/Role.js'
import User from '../models/User.js'

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId, {_id: 0, password: 0}).populate(
      {
        path: "roles",
        select: {
          name: 1,
          _id: 0
        }
      })

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