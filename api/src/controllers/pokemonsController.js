const {Pokemon, Type, Op} = require('../db');
const axios = require('axios');

const getPokemons = async (req, res, next) => {
    try {
        let {
            name,
            order
        } = req.query;

        let informationAPI;
        let informationDataBase;
        let allData = [];

        if (name && name !== "") {
           const responseB = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)).data;
           informationAPI = {
               image: responseB.sprites.front_default,
               name: responseB.name,
               types: responseB.types[0].type.name,
               id: responseB.id,
               createdInDatabase: responseB.createdInDatabase
           }

           informationDataBase = await Pokemon.findAll({
               include: {
                   model: Type,
                   attributes: ["name"],
                   through: {
                       attributes: []
                }
               },
               where: {
                   name: {
                       [Op.iLike]: `%${name}%`
                   }
               }
           });
           informationDataBase = informationDataBase.map(el => {
               return {
                   image: el.sprites.front_default,
                   name: el.name,
                   types: el.types,
                   createdInDatabase: el.createdInDatabase
               }
           })
           allData = informationDataBase.concat(informationAPI);
        } else {
            const myPokemonsOnPageOne = (await axios.get("https://pokeapi.co/api/v2/pokemon")).data.results;
            const myInformationOne = myPokemonsOnPageOne.map(el => axios.get(el.url));
            const myPokemonsOnPageTwo = (await axios.get("https://pokeapi.co/api/v2/pokemon")).data;
            const open = await axios.get(myPokemonsOnPageTwo.next);
            const nextPage = open.data.results;
            const myInformationTwo = nextPage.map(e => axios.get(e.url));
            const myInformation = myInformationOne.concat(myInformationTwo);
            const myObject = await Promise.all(myInformation);
            informationAPI = myObject.map(e => {
                return {
                    image: e.data.sprites.front_default,
                    name: e.data.name,
                    types: e.data.types[0].type.name,
                    createdInDatabase: e.createdInDatabase
                }
            });
            informationDataBase = await Pokemon.findAll({
                include: {
                    model: Type,
                    attributes: ["name"],
                    through: {
                        attributes: []
                 }
                }
            });
            informationDataBase = informationDataBase.map(el => {
                return {
                    image: el.sprites.front_default,
                    name: el.name,
                    types: el.types,
                    createdInDatabase: el.createdInDatabase
                }
            })
            allData = informationDataBase.concat(informationAPI);
        }

        //#region order
        if (order === "asc" || !order || order === "") {
            allData = allData.sort((a, b) => {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            });
        } else {
            allData = allData.sort((a, b) => {
                return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
            });
        }
        //#endregion

        if (allData.length === 0) {
            res.status(400).json({message: "Not Found"})
          } else {
            return res.json(allData);
          }
    } catch (error) {
        next (error)
        // return res.status(400).send({message: fallo});
    }
}

//#region Función para id
const getPokemonsById = async (req, res) => {
    const id = req.params.id;
    if(id) {
        try {
            if (!id.includes("-")) { //si no incluye un guion es de la api
                const byIdApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                const myDataByApi = {
                    image: byIdApi.data.sprites.front_default,
                    name: byIdApi.data.name,
                    types: byIdApi.data.types[0].type.name,
                    id: byIdApi.data.id,
                    hp: byIdApi.data.stats[0].base_stat,
                    attack: byIdApi.data.stats[1].base_stat,
                    defense: byIdApi.data.stats[2].base_stat,
                    speed: byIdApi.data.stats[5].base_stat,
                    height: byIdApi.data.height,
                    weight: byIdApi.data.weight
                }
                console.log(myDataByApi); 
                res.json(myDataByApi);
            } else {
                const byIdDB = await Pokemon.findAll({
                    include: {
                        model: Type,
                        attributes: ["name"],
                        through: {
                            attributes: []
                        }
                    }
                });
                const myDataByDB = {
                    image: byIdDB.image,
                    name: byIdDB.name,
                    types: byIdDB.types,
                    id: byIdDB.id,
                    hp: byIdDB.hp,
                    attack: byIdDB.attack,
                    defense: byIdDB.defense,
                    speed: byIdDB.speed,
                    height: byIdDB.height,
                    weight: byIdDB.weight
                }
                if(!byIdDB) {
                   res.status(400).send({message: "No se encontro el pokemon"})
                }
                res.json(myDataByDB)
            }
        } catch (error) {
            res.status(400).send({message: "No se pudo procesar su solicitud"})
        }
    }
}
//#endregion


const postPokemons = async (req, res, next) => {
    try {
        const  {
            // image,
            name,
            types,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            createdInDatabase
        } = req.body;
        let newPokemon = {
            // image,
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            createdInDatabase
        }
        try {
            let createPokemon = await Pokemon.create(newPokemon);
            let myTypes = await Type.findAll({
                where: {
                    name: types
                }
            });
            let pokemonCreated = await createPokemon.addTypes(myTypes);
            res.json({
                message: "Pokemon created successfully",
                pokemon: pokemonCreated
            })
        } catch (error) {
            next (error);
        }
    } catch (error) {
        next (error)
    }
}

module.exports = {
    getPokemons,
    getPokemonsById,
    postPokemons
}