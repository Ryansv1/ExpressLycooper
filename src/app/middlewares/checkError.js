module.exports = (req, res, next) => {
    if(req.authError) {
        const { error } = req.authError
        switch(error){
            case 'no token provided':
                return res.redirect('/login')
                console.log(error)
            break
            
            case 'token malformatted':
                return res.redirect('/login')
                console.log(error)
            break
            
            case 'token error':
                return res.redirect('/login')
                console.log(error)
            break
            
            case 'token invalid':
                return res.redirect('/login')
                console.log(error);
            break

            default:
                console.log(error);
                return res.json({error})
            break
        }
    } else {
        if(req.isValidToken){
            return next()
        } else {
            return res.redirect('/login')
        }
    }

}