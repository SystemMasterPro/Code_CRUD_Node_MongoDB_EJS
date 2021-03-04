const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("index", {titulo : "PAGINA PRINCIPAL"})
})

router.get('/servicios', (req, res) => {
    res.render("servicios", {tituloServicios: "PAGINA DE SERVICIOS"})
})

router.get('/error', (req, res) => {
    res.render("404", {titulo: "PAGINA 404 no existe esta ruta"})
})

module.exports = router;