const { apikey } = require('../../config/auth.json')

module.exports = (req, res, next) => {
    if(req.body.apikey === apikey) {
        return next()
    } else {
        return res.status(400).json({error: true, message: "incorrect apikey"})
    }
}