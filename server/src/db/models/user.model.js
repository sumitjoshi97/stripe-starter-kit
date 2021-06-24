import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, required: true, minLength: 3 },
  password: { type: String, required: true, minLength: 5 },
  paymentId: String,
})

const User = model('User', userSchema)

export default User
