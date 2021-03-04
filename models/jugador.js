const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const futbolistaSchema = new Schema({
    nombre: String,
    edad: Number,
    equipo: String
})

// crear modelo
const Futbolista = mongoose.model('jugadores', futbolistaSchema);

module.exports = Futbolista;