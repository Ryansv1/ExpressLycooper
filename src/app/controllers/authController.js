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
        return res.status(400).send({ error:'User Already Exists'})
        
        const user = await User.create(req.body);

        User.password = undefined;

        return res.send({ 
            user, 
            token: generateToken({ id: user.id }) 
         });

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
        return res.status(400).send({ error:'Usuário não encontrado'});

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error:'Invalid Password'});

        user.password = undefined;

        const token = generateToken({ id: user.id })
        res.cookie('authorization', `Bearer ${token}`).cookie('userId', user.id)
        
        res.redirect('/')
});

module.exports = app => app.use ('/auth', router);