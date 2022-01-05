const {Type} = require('../db'); //Trae los modelos

const getPokemonsTypes = async (req, res) => {
    try{
        const dbTypes = await Type.findAll() 
        if(dbTypes.length)
        return res.status(200).send(dbTypes)
        else{
            return res.status(400).json({message: "Your request could not be processed"})
        }
    }catch{
        return res.status(400).send('Error')
    }
}

module.exports = getPokemonsTypes;