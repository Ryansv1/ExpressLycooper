module.exports = (req, res, next) => {
    if(req.authError) {
        const { error } = req.authError
        switch(error){
            case 'no token provided':
                res.redirect('/login')
                console.log(error)
            break
            
            case 'token malformatted':
                res.redirect('/login')
                console.log(error)
            break
            
            case 'token error':
                res.redirect('/login')
                console.log(error)
            break
            
            case 'token invalid':
                res.redirect('/login')
                console.log(error);
            break

            default:
                console.log(error);
                res.json({error})
            break
        }
    } else {
        if(req.isValidToken){
            next()
        } else {
            res.redirect('/login')
        }
    }

}