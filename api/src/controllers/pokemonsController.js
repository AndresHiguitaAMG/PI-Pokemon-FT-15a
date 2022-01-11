const { Pokemon, Type } = require('../db');
const axios = require('axios');

//#region función para buscar por query o toda la información 
const getPokemons = async (req, res) => {
    try {
        let {
            name,
            order
        } = req.query;

        let informationAPI;
        let informationDataBase;
        let allData = [];   

        if (name && name !== "") {
            informationDataBase = await Pokemon.findOne({
                include: {
                    model: Type,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    } 
                },
                where:{
                    name
                }
            });
            const byNameAPI = !informationDataBase ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)).data : false;
            if (informationDataBase !== null) {
                informationDataBase = informationDataBase.dataValues;
                // informationDataBase = informationDataBase.map(e => {
                //     return {
                //         name: e.name,
                //         types: e.types,
                //         id: e.id,
                //         createdInDatabase: e.createdInDatabase
                //     }
                // });
            } 
            informationAPI = byNameAPI && {
                image: byNameAPI.sprites.front_shiny,
                name: byNameAPI.name,
                types: byNameAPI.types[0].type.name,
                id: byNameAPI.id,
            }
            allData = byNameAPI ? informationAPI : informationDataBase;
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
                    image: e.data.sprites.front_shiny,
                    name: e.data.name,
                    types: e.data.types[0].type.name,
                    id: e.data.id
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
                    // image: el.image,
                    name: el.name,
                    types: el.types,
                    id: el.id,
                    createdInDatabase: el.createdInDatabase
                }
            });
            allData = informationDataBase.concat(informationAPI);
        }
        //#region order
        if (Array.isArray(allData)) {
            if (order === "asc" || !order || order === "") {
                allData = allData.sort((a, b) => {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                }); 
            } else {
                allData = allData.sort((a, b) => {
                    return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
                });
            }
        }
        //#endregion
        if (allData.length === 0) {
            res.status(400).json({message: "Not Found"})
        } else {
            return res.json(allData);
        }
    } catch (error) {
        if (error.response !== undefined) {
            console.log(error.response.data);
            return res.status(400).send({message: "Pokemón not found"});
        } else {
            console.log(error);
            return res.status(400).send({message: "unexpected error"});
        }
    }
}
//#endregion

//#region Función para id
const getPokemonsById = async (req, res, next) => {
    const id = req.params.id;
    if (id) {
        try {
            if (!id.includes("-")) {
                const byIdApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
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
                };
                res.json(myDataByApi);
            } else {
                const byIdDB = await Pokemon.findOne({
                    where: {
                        id: id
                    },
                    include: Type
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
                    weight: byIdDB.weight,
                    createdInDatabase: byIdDB.createdInDatabase
                };
                if (!byIdDB) {
                    return res.status(400).send({ message: "It was not found" });
                }
                return res.json(myDataByDB);
            }
        } catch (error) {
            next(error);
        }
    }
};
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