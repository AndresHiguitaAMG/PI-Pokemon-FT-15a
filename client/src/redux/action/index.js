import axios from 'axios';
export const GET_POKEMONS = 'GET_POKEMONS';
export const SET_NAME = 'SET_NAME';
export const GET_POKEMONS_BY_ID = 'GET_POKEMONS_BY_ID';
export const REMOVE_POKEMON = 'REMOVE_POKEMON';

export const getPokemons = ({ name, order }) => {
    return (dispatch) => {
        axios.get(`http://localhost:3001/pokemons?order=${order ? order : ""}&name=${name ? name : ""}`)
        .then (responseApi => {
            return dispatch ({
                type: GET_POKEMONS,
                payload: responseApi.data
            })
        }).catch((error) => {
            console.log(error);
        });
    }
}

export const setName = (name) => {
    return {
        type: SET_NAME,
        payload: name
    }
}

export const getPokemonsById = (id) => {
    return async function (dispatch) {
        try {
            const detailPokemon = await axios.get(`http://localhost:3001/pokemons/${id}`);
            return dispatch ({
                type: GET_POKEMONS_BY_ID,
                payload: detailPokemon.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const removePokemon = () => {
    return {
        type: REMOVE_POKEMON,
        payload: {}
    }
}