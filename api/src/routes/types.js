const router = require('express').Router();
const getPokemonsTypes = require('../controllers/typesController')

router.get('/', getPokemonsTypes)

module.exports = router;