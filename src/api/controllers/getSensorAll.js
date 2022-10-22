const express = require('express');
const Sensores = require('../../models/sensores');
const checkApiKey = require('../../app/middlewares/checkApiKey');
const { ftruncateSync } = require('fs');
const router = express.Router();

router.post('/getall', async (req, res) => {
    const { sensor, dataColeta } = req.body
    try {
        console.log(req.body)
        const dadosSensor = await Sensores.find({id:sensor});   
        // const dadosSensor = await Sensores.find({createdAt: {$where: function(dataColeta, next){
        //     const date = Sensores.createdAt 
        //     date = date.split("T") // Retorna um Array [ "2022-10-21", "12:48:00.657Z" ]
        //     if (date === dataColeta){
        //         next()
        //     }
        //     else{
        //         console.log('erro no if')
        //     }
        // }}})
        res.json(dadosSensor)

    } catch (err) {
        console.log(err)
        res.json(err)
    }

})

module.exports = app => app.use('/api', router);