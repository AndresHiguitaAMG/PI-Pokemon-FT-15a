const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonsRouter = require('./pokemons');
const pokemonTypeRouter = require('./types');
const createPokemonRouter = require('./pokemon');


const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', pokemonsRouter)
router.use('/types', pokemonTypeRouter)
router.use('/pokemon', createPokemonRouter)

module.exports = router;
