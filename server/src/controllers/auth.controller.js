import User from '../db/models'
import { ErrorHandler } from '../utils/error'

const signupUser = async (req, res, next) => {
  try {
    const { name, password } = req.body
    console.log(req.body)
    console.log(User)
    const userExists = await User.findOne({ name })

    if (userExists) {
      console.log('exists')
      throw new ErrorHandler(400, 'user already exists, try another username')
    }

    const newUser = new User({
      name,
      password,
    })

    await newUser.save((err, user) => {
      req.session.userId = user.id
      res.send({ username: newUser.name })
    })

    next()
  } catch (err) {
    next(err)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { name, password } = req.body

    const userExists = await User.findOne({ name })

    if (!userExists || userExists.password !== password) {
      throw new ErrorHandler(400, 'no user exists with given username/password')
    }

    req.session.userId = userExists.id
    res.send({ username: userExists.name })
    next()
  } catch (err) {
    next(err)
  }
}

const logoutUser = (req, res, next) => {
  try {
    if (!req.session.userId) {
      throw new ErrorHandler(400, 'no user logged in')
    }

    req.session = null

    next()
  } catch (err) {
    next(err)
  }
}

export { signupUser, loginUser, logoutUser }
