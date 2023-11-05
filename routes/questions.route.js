const controller = require('../controller/questions.controller')
const { isAuth } = require('../middleware/auth.middle')

module.exports = function (app) {
    app.get(
        "/api/questions",
        isAuth,
        controller.Questions
    )
}