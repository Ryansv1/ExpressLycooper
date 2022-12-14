const express = require('express');
const Sensores = require('../../models/sensores');
const checkApiKey = require('../../app/middlewares/checkApiKey')
const router = express.Router();

router.post('/getdata',  async (req, res) => {
    try {
        const data = req.body
        const sensorData = await Sensores.find()
        return res.json(sensorData)
    } catch (error) {
        return res.json(error)
    }

})

module.exports = app => app.use('/api', router);