import {Router} from 'express'
import * as authCtrl from '../controllers/auth.controller.js'
import {validateConfig, validateFields, validateUsernameAndEmail} from '../middlewares/userValidation.js'

const router = Router()

router.post("/register", [validateConfig(), validateFields, validateUsernameAndEmail], authCtrl.registerUser)
router.post("/login", authCtrl.loginUser)

export default router