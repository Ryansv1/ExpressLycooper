module.exports = (req, res, next) =>{   
    switch(req.query.sensor){
        case '1': 
            req.nomeSensor = "Temperatura do Tanque"
        next()
        break

        case '2': 
            req.nomeSensor = "Umidade do Solo"
        next()
        break

        case '3': 
            req.nomeSensor = "pH"
        next()
        break

        case '4': 
            req.nomeSensor = "Temperatura da água"
        next()
        break
        
        default: 
            req.nomeSensor = "sensor desconhecido"
        next()
        break
    }
}