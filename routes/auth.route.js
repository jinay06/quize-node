const Controller = require('../controller/auth.controller')
module.exports = function (app) {
    app.post(
        "/auth/create-user",
        Controller.Create_user
    )
    app.post(
        "/auth/sign-in",
        Controller.SigninUser
    )
}