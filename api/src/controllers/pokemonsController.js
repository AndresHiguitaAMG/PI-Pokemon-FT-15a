const {Pokemon, Type, Op} = require('../db');
const axios = require('axios');

const getPokemons = async (req, res, next) => {
    try {
        let {
            name,
            // order
        } = req.query;
        
        let informationAPI;
        let informationDataBase;
        let allData = [];

        if (name && name !== "") {
           const responseB = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);   
           const content = Object.keys(responseB.data);
           console.log(content)    
           informationAPI = content.map(a => {
               return {
                   name: a[name]  
               }
           })

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
                   types: el.types 
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
                    types: e.data.types[0].type.name 
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
                    types: el.types
                }
            })
            allData = informationDataBase.concat(informationAPI);
            // console.log(allData);
        }
        
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



const getPokemonsById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (id) {
            if (!id.includes("-")) {
                const byIdApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                
            }
        }
    } catch (error) {
        next (error)
    }
}



const postPokemons = async (req, res, next) => {
    try {
        
    } catch (error) {
        next (error)
    }
}

module.exports = {
    getPokemons,
    getPokemonsById,
    postPokemons
}