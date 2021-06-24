import { connect, connection } from 'mongoose'

connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = connection

db.on(
  'error',
  console.error.bind(console, 'database cannot be connected, try again')
)
db.once('open', () => console.log('database connected'))
