const { Router } = require('express');
const { getAllDogs, getTemp } = require('../FuncionesModels/Models.js');
const { Dog, Temperament } = require('../db.js');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();


// Configurar los routers

// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req, res) => {
    const name = req.query.name;
    const dogTotal = await getAllDogs();
    if (name) {
        let dogName = await dogTotal.filter(el => el.name.toUpperCase().includes(name.toUpperCase()));
        dogName.length < 0 ? res.status(404).send("No se encuentra el perrito") : res.status(200).send(dogName);
    }
    else {
        res.status(200).send(dogTotal)
    }
});

router.get('/dogs/:id', async (req, res) => {
    const id = req.params.id;
    const dogTotal = await getAllDogs();
    if (id) {
        let dogId = await dogTotal.filter(el => el.id == id);
        dogId.length ?
        res.status(200).json(dogId) :
        res.status(400).send("No se encuentra su raza")
    }
})

router.get('/temperaments', async (req, res) => {
    let tempTotal = await getTemp()
    const onEach = tempTotal.forEach(element => {
        Temperament.findOrCreate({
            where: { name: element }
        })
    });
    const allTemp = await Temperament.findAll()
    res.status(200).send(allTemp)
})

router.post('/dog', async (req, res) => {
    let { 
        name, 
        weight_max,
        weight_min,
        height_max,
        height_min, 
        life_span, 
        temperament, 
        createdInDb, 
        image 
    } = req.body
    console.log(req.body)
    let height = [];
    let weight = [];
    weight.push(weight_min + "-" + weight_max).toString()
    height.push(height_min + "-" + height_max).toString()
    try {
        const dogCreate = await Dog.create({ 
            name, 
            weight: weight.toString(),
            weight_max,
            weight_min,
            height_max,
            height_min,  
            height: height.toString(), 
            life_span, 
            createdInDb: true,
            image 
        });
        const tempDb = await Temperament.findAll({
            where: { name: temperament }
        })
        dogCreate.addTemperament(tempDb)
        res.send('Creado exitosamente')
    } catch (e) {
        console.error(e)
        res.status(404).send(e)
    }
})


router.delete('/dogs/:id', async (req, res) => {
    const id = req.params.id;
    try{
        if(id){
            const allDog = await Dog.destroy({
                where: { id: id}
            })
            res.send("eliminado")
        }     
    }catch(e){
        res.status(404).send(e)
    }  
})

module.exports = router;



