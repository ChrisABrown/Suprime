import AuthDAO from '../../DAO/authDAO.js'
import Authentication from '../../authenticate.js'

export default class AuthController {
  static async logIn(req, res, next) {
    const token = Authentication.getToken({ _id: req.user._id })

    const refreshToken = Authentication.getRefreshToken({ _id: req.user._id })

    const user = () => AuthDAO.logIn(req.user)
    user().then(
      (user) => {
        user.refreshToken.push({ refreshToken })
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500
            res.send(err)
          } else {
            res.cookie(
              'refreshToken',
              refreshToken,
              Authentication.COOKIE_OPTIONS
            )
            res.send({ success: true, token })
          }
        })
      },
      (err) => next(err)
    )
  }

  static async signUp(req, res, next) {
    const user = {
      username: req.body.username,
      email: req.body.email,
      profile: req.body.profile,
    }

    const newUser = await AuthDAO.signUp(user, req)

    let response = {
      status: 'error' in newUser ? 'Fail' : 'Success',
      data: 'error' in newUser ? newUser.error.name : newUser._doc,
      message:
        'error' in newUser ? newUser.error.message : 'Thanks for signing up',
    }

    !response
      ? next(new AppError()) && res.json(new AppError('NotFound', 404))
      : res.send(response).status(200)
  }
}
