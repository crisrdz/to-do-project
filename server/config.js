import {config} from 'dotenv'

config()

export const PORT = process.env.PORT
export const DB_NAME = process.env.DB_NAME
export const SECRET_KEY = process.env.SECRET_KEY