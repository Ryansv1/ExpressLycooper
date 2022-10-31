const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();

// Setup
app.set('view engine', 'ejs');
app.set('views', 'src/views/');
app.use(express.static('src/public'))

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/index')(app);
require('./api/controllers/setSensorData')(app);
const authMiddleware = require('./app/middlewares/auth')
const checkErrorMiddleware = require('./app/middlewares/checkError');
const sensorData = require('./app/middlewares/getSensorData')
const getSensorAll = require('./app/middlewares/getSensorAll');
const nomeSensor = require('./app/middlewares/nomeSensor');

// Rotas

app.get('/', authMiddleware, checkErrorMiddleware, (req, res) => {
    res.render('pages/index', { title:'Home - Lycooper'});
});
app.get('/sensores', authMiddleware, checkErrorMiddleware, sensorData, (req, res)=>{
    res.render('pages/sensores', { title:'Sensores - Lycooper', sensores: req.sensores});
})
app.get('/consulta', authMiddleware, checkErrorMiddleware,  (req, res)=>{
    res.render('pages/dados', { title:'Consulta - Lycooper'});
})
app.get('/signin', (req, res)=> {
    res.render('pages/signin', { title:'Signin - Lycooper'});
});
app.get('/login', (req, res)=> {
    res.render('pages/login', { title:'Login - Lycooper' });
});
app.get('/getAllSensorData', getSensorAll, nomeSensor,  (req, res)=>{
    res.render('pages/resultado-consulta', { title: 'Resultado - Lycooper', nomeDoSensor: req.nomeSensor, data: req.query.dataColeta, resultados: req.resultados})
})


app.listen(9090);
console.log('app running on 1818');