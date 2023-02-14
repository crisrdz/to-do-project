import mongoose from 'mongoose'
import {DB_NAME} from './config.js'

mongoose.set("strictQuery", false)

const connectDB = async () => {
  const db = await mongoose.connect(DB_NAME)
  console.log(`Connected to database ${db.connection.name}`)
}

connectDB()