const { Router } = require('express');
const router = Router();
const {getPokemons, getId} = require('../controllers/pokemons'); //para que trabaje en mi ruta get

router.get('/', getPokemons)
router.get('/:id', getId)

module.exports = router;