import express from 'express'
import cors from 'cors'
import './config/passport'
import router from './API/routes/items.route.js'
import router2 from './API/routes/users.route.js'
import pkg from 'express-openid-connect'
const { auth, requiresAuth } = pkg

const app = express()
const itemsRouter = router
const usersRouter = router2

app.use(cors())
app.use(express.json())
app.use('/api/v1/items', itemsRouter)
app.use('/api/v1/users', usersRouter)
app.use('*', (req, res) => {
  res.status(404).json({ error: 'not found' })
})
app.use((err, req, res, next) => {
  err.status = err.status || 'fail'
  err.statusCode = err.statusCode || 500

  res.status(err.statusCode).json({
    status: err.status,
    message: transformMessage(err.message),
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  })

  err.name === 'ValidationError'
    ? res.status(422).json({
        errors: Object.keys(err.errors).reduce((errors, key) => {
          errors[key] = err.errors[key].message

          return errors
        }, {}),
      })
    : next(err)
})

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: 'http://localhost:4040',
  clientID: 'VhmXU9D5jPV3tViazHR6da0nWXpL96Qu',
  issuerBaseURL: 'https://dev-xxofmt70.us.auth0.com',
}

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config))

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user))
})

export default app
