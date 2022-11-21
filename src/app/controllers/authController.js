const express = require('express');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const authConfig = require('../../config/auth.json');


const router = express.Router();

router.post('/register', async (req,res) => {
    const { email } = req.body;
    
    try {
        if(await User.findOne({ email }))
        return res.redirect('/signin?err=1')
        
        const user = await User.create(req.body);

        user.password = undefined;

        return res.redirect('/login?success=1')

    } catch (err){
        return res.status(400).send({ error: 'Registration Failed '});
    }
});

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, { 
        expiresIn: '2h',  
      });
}

router.post('/authenticate', async (req,res) =>{
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user)
        return res.redirect('/login?err=1'); //not found user

    if(!await bcrypt.compare(password, user.password))
        return res.redirect('/login?err=2')  //invalid pass

        user.password = undefined;

        const token = generateToken({ id: user.id })
        res.cookie('authorization', `Bearer ${token}`).cookie('userId', user.id)
        
        return res.redirect('/')
});

router.post('/forgotPass', async (req,res)=>{
    const { password, params } = req.body

    const hash = await bcrypt.hash(password, 10);
    try {
        const user = await User.findOneAndUpdate({email: params}, {password: hash}, {new: true}).select('+password')
        console.log(user)
        return res.redirect('/login')
    } catch(err){
        console.log(err)
    }
})

module.exports = app => app.use ('/auth', router);