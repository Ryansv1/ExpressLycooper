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
        type: Date,
        default: Date.now
    }
});


sensoresSchema.pre('save', async function(next){
    const date = this; // DEU CERTOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    console.log(date.createdAt)

    // preciso pegar a data antes dela ser inserida, usando o pre 'save', e assim
    // usar a função split("T") pra separar o valor da data em apenas 2022-10-21
    // para assim conseguir consultar pelo front
    // 
    // porém encontrei um problema ao tentar esse fluxo. A função split não funciona fora de arrays ou strings
    // e como a "date" é um objeto, ela não funciona sobre ele.
    // tenho que achar uma maneira de acessar o valor desse objeto, e assim conseguir usar a função split.
})

const Sensores = mongoose.model('Sensores', sensoresSchema);
module.exports = Sensores;
