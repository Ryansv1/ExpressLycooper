const mongoose = require('mongoose');

mongoose.connect('coloque o link do db aqui').then(
    ()=> console.log('mongodb connected')
).catch(err => (console.log(err)));
mongoose.Promise = global.Promise;

module.exports = mongoose;
