import {Router} from 'express'
import {verifyToken} from '../middlewares/verifyToken.js'
import {validateConfig, validateFields, validatePasswordOld} from '../middlewares/userValidation.js'
import * as userCtrl from '../controllers/user.controller.js'

const router = Router()

router.get("/", verifyToken, userCtrl.getUser)
router.put("/", [verifyToken, validateConfig(), validateFields, validatePasswordOld], userCtrl.updateUser)

export default router