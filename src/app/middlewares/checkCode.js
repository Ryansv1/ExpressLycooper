module.exports = (req, res, next)=>{
    const { code }= req.query
    if(!code) return res.redirect('/checkCode?err=1') 
    if(code === '134220'){
        return next()
    }  else {
        return res.status(400).send({error: 'Código Inválido'})
    }
}