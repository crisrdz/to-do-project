import List from '../models/List.js'
import User from '../models/User.js'

export const getLists = async (req, res) => {
  try {
    const lists = await List.find({user: req.userId})

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

    const list = new List({
      name,
      completed,
      items,
      user: user._id
    })

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
    const updatedList = await List.findOneAndUpdate({_id:req.params.id, user: req.userId}, req.body, {
      new: true
    }) 

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