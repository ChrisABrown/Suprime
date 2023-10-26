import passport from 'passport'
import jwt from 'jsonwebtoken'

const dev = process.env.NODE_ENV !== 'production'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !dev,
  signed: true,
  maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
  sameSite: 'none',
}

function getToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: eval(process.env.SESSION_EXPIRY),
  })
}

function getRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
  })
  return refreshToken
}

const verifyUser = passport.authenticate('jwt', { session: false })

const Authentication = {
  verifyUser,
  getRefreshToken,
  getToken,
  COOKIE_OPTIONS,
}

export default Authentication