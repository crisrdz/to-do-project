import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import listRoutes from './routes/list.routes.js'
import userRoutes from './routes/user.routes.js'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

// Middlewares
app.use(express.json())
app.use(morgan("dev"))

//Routes
app.use("/api/auth", authRoutes)
app.use("/api/lists", listRoutes)
app.use("/api/user", userRoutes)

app.use(express.static(join(__dirname, '../client/dist')))

export default app