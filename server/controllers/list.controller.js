import List from '../models/List.js'
import User from '../models/User.js'

export const getLists = async (req, res) => {
  try {
    // Verificar funcionamiento
    const limit = 12
    const {page} = req.query
    const lists = await List.find({user: req.userId}).limit(limit).skip(limit * (page - 1)).sort("-createdAt")

    res.json({
      success: true,
      lists
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const createList = async (req, res) => {
  try {
    const {name, items, completed} = req.body

    const user = await User.findById(req.userId)

    let list = new List({
      name,
      completed,
      items,
      user: user._id
    })

    if(list.items.every(item => item.completed)){
      list.completed = true
    }else{
      list.completed = false
    }

    const listSaved = await list.save()

    res.json({
      success: true,
      listSaved
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const updateList = async (req, res) => {
  try {
    const {name, items, completed} = req.body
    
    let list = await List.findOne({_id: req.params.id, user: req.userId})
    
    list.name = name
    list.items = items
    if(completed) list.completed = completed

    if(list.items.every(item => item.completed)){
      list.completed = true
    }else{
      list.completed = false
    }
    
    const updatedList = await list.save()

    if(!updatedList) return res.status(401).json({
      success: false,
      message: "No autorizado"
    })

    res.json({
      success: true,
      updatedList
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const deleteList = async (req, res) => {
  try {
    const deletedList = await List.findOneAndDelete({_id: req.params.id, user: req.userId})

    if(deletedList){
      return res.sendStatus(204)
    }else{
      return res.sendStatus(404)
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getList = async (req, res) => {
  try {
    const list = await List.findOne({_id: req.params.id, user: req.userId})

    if(!list){
      return res.status(401).json({
        success: false,
        message: "No autorizado"
      })
    }

    res.json({
      success: true,
      list
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}