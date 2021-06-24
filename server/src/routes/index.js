import express from 'express'
import { Auth, Payment } from '../controllers'

const router = express.Router()

router.post('/signup-user', Auth.signupUser)

router.post('/login-user', Auth.loginUser)

router.get('/logout', Auth.logoutUser)

router.post('/charge-new-card', Payment.chargeNewCard)

router.post('/charge-saved-card', Payment.chargeSavedCard)

router.get('/payment-methods', Payment.getPaymentMethods)

export default router
