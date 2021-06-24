import User from '../db/models'
import { stripe } from '../utils/stripe'
import { ErrorHandler } from '../utils/error'

const getUserPaymentId = async (userId) => {
  const user = await User.findById(userId)

  if (!user) {
    throw new ErrorHandler(400, 'no user logged in')
  }

  if (!user.paymentId) {
    const customer = await stripe.customers.create()
    user.paymentId = customer.id
    await user.save()

    return customer.id
  }

  return user.paymentId
}

const chargeNewCard = async (req, res, next) => {
  try {
    const { amount } = req.body

    const paymentIntent = await stripe.paymentIntents.create({
      customer: await getUserPaymentId(req.session.userId),
      setup_future_usage: 'off_session',
      amount,
      currency: 'inr',
    })

    res.send(paymentIntent)

    next()
  } catch (err) {
    next(err)
  }
}

const chargeSavedCard = async (req, res, next) => {
  try {
    const { amount, paymentMethod } = req.body
    const currentUser = await User.findById(req.session.userId)

    if (!currentUser) {
      throw new ErrorHandler('400', 'no user logged in')
    }

    if (!currentUser.paymentId) {
      throw new ErrorHandler(400, 'You do not have any saved cards')
    }

    const paymentIntent = await stripe.paymentIntents.create({
      customer: currentUser.paymentId,
      payment_method: paymentMethod,
      off_session: true,
      confirm: true,
      amount,
      currency: 'inr',
    })

    res.send(paymentIntent)
    next()
  } catch (err) {
    next(err)
  }
}

const getPaymentMethods = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.session.userId)

    if (!currentUser) {
      throw new ErrorHandler('400', 'no user logged in')
    }

    if (!currentUser.paymentId) {
      throw new ErrorHandler(400, 'You do not have any saved cards')
    }

    const savedPaymentMethods = await stripe.paymentMethods.list({
      customer: currentUser.paymentId,
      type: 'card',
    })

    res.send(savedPaymentMethods)
    next()
  } catch (err) {
    next(err)
  }
}

export { chargeNewCard, chargeSavedCard, getPaymentMethods }
