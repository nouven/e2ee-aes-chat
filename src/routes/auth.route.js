import express from 'express'
import authController from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/info', authController.verifyToken)

export default router
