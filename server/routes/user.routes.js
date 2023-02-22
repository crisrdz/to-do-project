import {Router} from 'express'
import {verifyToken} from '../middlewares/verifyToken.js'
import {validateConfig, validateFields, validatePasswordOld} from '../middlewares/userValidation.js'
import * as userCtrl from '../controllers/user.controller.js'

const router = Router()

//admin
router.get("/admin", verifyToken, userCtrl.getUsers)
router.put("/admin/disable", verifyToken, userCtrl.disableUser)
router.put("/admin/enable", verifyToken, userCtrl.enableUser)
router.put("/admin/changeRole", verifyToken, userCtrl.changeRole)

//user
router.get("/", verifyToken, userCtrl.getUser)
router.put("/", [verifyToken, validateConfig(), validateFields, validatePasswordOld], userCtrl.updateUser)

export default router