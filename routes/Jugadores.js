const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Futbolista = require('../models/jugador')

router.get('/', async (req, res) => {
    try {
        const arrayFutbolistasDB = await Futbolista.find()
        // console.log(arrayFutbolistasDB)
        res.render("jugador", { arrayJugadores: arrayFutbolistasDB})
    } catch (error) {
        console.log(error)
        console.log("NO HAY DATOS");
    }
});

router.get('/find/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const busqueda = await Futbolista.findById(id);
        res.json( busqueda )
        console.log(busqueda);
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    const body = req.body;
    // console.log(body);
    try {
        await Futbolista.create(body)
        res.redirect("/jugadores");
    } catch (error) {
        console.log(error);
    }
});

router.get('/crear', (req, res) => { 
    res.render("crear");
})

router.delete('/:id', async (req, res) => {
    const myId = req.params.id;
    // console.log(myId);
    try {
        if (mongoose.Types.ObjectId.isValid(myId)) {
            // console.log("es valido");
            const jugadorDB = await Futbolista.findByIdAndDelete({_id: myId})
            if (jugadorDB) {
                res.json({
                    estado: true,
                    mensaje: "eliminado"
                })
            } else {
                res.json({
                    estado: false,
                    mensaje: "no eliminado"
                })
            }
        } else { 
            console.log("ID no es valido");
        }
    } catch (error) {
        console.log(error);
    }
});

router.put('/:id',async (req, res) => {
    let id = req.params.id;
    const body = req.body;
    try {
        const u = await Futbolista.findByIdAndUpdate(id, body, { useFindAndModify: false })
        if (u) {
            res.json({ estado: true })
        } else { 
            res.json({estado:false})
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;