const { json } = require('body-parser');
const date = require('mongoose/lib/cast/date');
const { object } = require('mongoose/lib/utils');
const mongoose = require('../database');

const sensoresSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,     /* SERÁ SALVO COMO NUMBER PARA DIFERENCIAR APENAS NO CODIGO DO ARDUINO 1=PH 2=TH2O 3=UMSOLO */
    },
    dados: {
        valor: {
            type: Number
        },
    },
    createdAt:{
        type: String,
        default: Date.now
    }
});


sensoresSchema.pre('save', async function(next){
    const novaData = new Date().toISOString()
    this.createdAt = String(novaData).split('T')[0];
})

const Sensores = mongoose.model('Sensores', sensoresSchema);
module.exports = Sensores;
