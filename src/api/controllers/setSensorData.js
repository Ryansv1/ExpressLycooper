const express = require('express');
const Sensores = require('../../models/sensores');
const router = express.Router();

router.post('/insert', async (req, res)=>{
    try {
        const Sensor = await Sensores.create(req.body);
        console.log(Sensor);
        return  res.json({Sensor});
    } catch (err){
        return console.log(err)
    }
});

module.exports = app => app.use('/api', router);
