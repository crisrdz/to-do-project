import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import listRoutes from './routes/list.routes.js'
import userRoutes from './routes/user.routes.js'

const app = express()

// Middlewares
app.use(express.json())
app.use(morgan("dev"))

//Routes
app.use("/api/auth", authRoutes)
app.use("/api/lists", listRoutes)
app.use("/api/user", userRoutes)

export default app