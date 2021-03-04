const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// UTILIZAMOS PARA PASAR NUESTRO FORMULARIO AL SERVIDOR
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Lo requerimos para ocultar nuestras variables
require('dotenv').config()
// Puerto por defecto 3000, cuando es subido a un hosting recibe el puerto que le de el mismo hosting
const port = process.env.PORT || 3000;

// Conexión a Base de datos
const mongoose = require('mongoose');

// Conexion de prueba
// const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ncdk5.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
// Conexion real
// LAS VARIABLES SE ENCUENTRAN EN EL ARCHIVO .ENV
const uri = `mongodb+srv://admin:1234567890@cluster0.cooj3.mongodb.net/futbol?retryWrites=true&w=majority`;
// Conexion a la bd de Mongo
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    // Respuesta si hubo exito
    .then(() => console.log('Base de datos conectada'))
    // respuesta si hubo problemas
    .catch(e => console.log(e))

// Configuracion motor de plantillas
app.set('view engine', 'ejs');
// En esta ruta estaran las plantillas
app.set('views', __dirname + '/views');

// Archivos estaticos le pasamos la direccion
app.use(express.static(__dirname + "/public"));

// Rutas Web
app.use('/', require('./routes/RutasWeb'));
app.use('/jugadores', require('./routes/Jugadores'));
// Si la ruta no existe saltara este mensaje de pagina no found
app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "Pagina no encontrada 404"
    })
})
// Nuestro servidor corriendo nivel sayayin
app.listen(port, () => {
    console.log('servidor a su servicio en el puerto', port)
})