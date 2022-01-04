const { Router } = require('express');
const router = Router();
const {getPokemons, getPokemonsById, postPokemons} = require('../controllers/pokemonsController');

router.get('/', getPokemons);

router.get('/:id', getPokemonsById);

router.post('/create', postPokemons);

module.exports = router;