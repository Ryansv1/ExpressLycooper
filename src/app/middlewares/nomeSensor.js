module.exports = (req, res, next) =>{   
    switch(req.query.sensor){
        case '1': 
            req.nomeSensor = "Temperatura do Tanque"
        return next()
        break

        case '2': 
            req.nomeSensor = "Umidade do Solo"
        return next()
        break

        case '3': 
            req.nomeSensor = "pH"
        return next()
        break

        case '4': 
            req.nomeSensor = "Temperatura da água"
        return next()
        break
        
        default: 
            req.nomeSensor = "sensor desconhecido"
        return next()
        break
    }
}