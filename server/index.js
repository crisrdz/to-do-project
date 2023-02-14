import app from './app.js'
import {PORT} from './config.js'
import './database.js'
import './libs/initialSetup.js'

app.listen(PORT)
console.log(`Server on port ${PORT}`)