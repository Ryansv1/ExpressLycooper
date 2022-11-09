const Sensores = require('../../models/sensores')

module.exports = async (req, res, next) =>{
    const { sensor, dataColeta } = req.query
    try {
        if(!dataColeta) return res.redirect('/consulta?err=1')
        if(!sensor) return res.redirect('/consulta?err=1')
        if(!sensor || !dataColeta) return res.redirect('/consulta?err=1')
        req.resultados = await Sensores.find({id:sensor, createdAt: dataColeta});
        if (!req.resultados[0]) return res.redirect('/consulta?err=2') 
        return next();
    } catch (err) {
        console.log(err)
        return res.redirect('/consulta?err=1')
    }
}