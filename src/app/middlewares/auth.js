const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json')

module.exports = (req, res, next) =>{
    const authorization = req.cookies.authorization;

    if(!authorization){
        console.log('nao tem token');
        req.authError = { error: 'no token provided' }
        next()
    }

    const parts = authorization ? authorization.split(' ') : '';

    if(!parts.length === 2){
        console.log('token == 2');
        req.authError = { error: 'token error'}
        next()
    }


    const [ scheme, token ] = parts;
    
    if(!/^Bearer$/i.test(scheme)){
        req.authError = { error: 'token malformatted' }
        console.log('token nao passou no test');
        next()
    }
        
  jwt.verify(token, authConfig.secret, (err, decoded) =>{
    if(err) {
        req.authError = { error: 'token invalid' }
        req.isValidToken = false
        // console.log('token invalido, next');
        next()
    } else {   
        // console.log('nao entra se der next');
        req.userId = decoded.id;
        req.isValidToken = true;
        res.cookie('authorization', `Bearer ${token}`)
        // console.log('setou o cookie');
        next()
    }});
};