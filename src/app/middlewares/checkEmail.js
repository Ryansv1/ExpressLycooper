const User = require('../../models/user');

module.exports = async (req, res, next)=>{
    const { email } = req.query

    if(await User.findOne({email})){
        return next()
    } else {
        return res.status(400).send({ error: 'não existe um email cadastrado'})
    }
}