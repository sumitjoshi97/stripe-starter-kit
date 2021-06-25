import express from 'express'
import cors from 'cors'
import cookieSession from 'cookie-session'

import routes from './routes'

const app = express()

app.use(express.json())
app.use(cors())

app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.SESSION_KEY1, process.env.SESSION_KEY2],
    secure: true,
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })
)

app.use('/', routes)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`server running at port ${PORT}`))
