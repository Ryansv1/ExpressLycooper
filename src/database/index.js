const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mydb_ifc:123@cluster0.hvyyhts.mongodb.net/').then(
    ()=> console.log('mongodb connected')
).catch(err => (console.log(err)));
mongoose.Promise = global.Promise;

module.exports = mongoose;
