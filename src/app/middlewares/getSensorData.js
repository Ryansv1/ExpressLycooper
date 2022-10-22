const Sensores = require('../../models/sensores')

module.exports = async(req, res, next) => {
    try {
        const sensor1 = await Sensores.findOne({id:1}).sort({createdAt:-1})
        const sensor2 = await Sensores.findOne({id:2}).sort({createdAt:-1})
        const sensor3 = await Sensores.findOne({id:3}).sort({createdAt:-1})
        const sensor4 = await Sensores.findOne({id:4}).sort({createdAt:-1})
        req.sensores = {sensor1, sensor2, sensor3, sensor4}
        next()
    } catch (error) {
        console.log(error)
        console.log('erro no getsensordata-front');
        res.json(error)
    }
}