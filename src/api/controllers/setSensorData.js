const express = require('express');
const Sensores = require('../../models/sensores');
const checkApiKey = require('../../app/middlewares/checkApiKey');
const router = express.Router();

router.post('/insert', async (req, res)=>{
    try {
        const Sensor = await Sensores.create(req.body);
        return  res.json({ Sensor })  /* criar code arduino com os parametros necessários e no formato ideal do json  do model "sensores" */
    } catch (err){
        return console.log(err)
    }
});

module.exports = app => app.use('/api', router);
