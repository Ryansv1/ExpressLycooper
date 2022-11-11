module.exports = (req, res, next) =>{
    const { email } = req.query
    if (!email) return res.redirect('/forgot?err=1')
    return next()
}