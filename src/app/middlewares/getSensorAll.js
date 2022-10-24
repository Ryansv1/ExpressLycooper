const Sensores = require('../../models/sensores')

module.exports = async (req, res, next) =>{
    const { sensor, dataColeta } = req.query
    try {
        if(!sensor || !dataColeta) return res.redirect('/consulta')
        req.resultados = await Sensores.find({id:sensor, createdAt: dataColeta});  
        next();
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}