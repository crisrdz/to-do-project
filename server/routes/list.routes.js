import {Router} from 'express'
import * as listCtrl from '../controllers/list.controller.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import { validateConfig, validateFields } from '../middlewares/listValidation.js'

const router = Router()

router.get("/", verifyToken, listCtrl.getLists)
router.post("/", [verifyToken, validateConfig(), validateFields], listCtrl.createList)
router.put("/:id", [verifyToken, validateConfig(), validateFields], listCtrl.updateList)
router.delete("/:id", verifyToken, listCtrl.deleteList)
router.get("/:id", verifyToken, listCtrl.getList)

export default router