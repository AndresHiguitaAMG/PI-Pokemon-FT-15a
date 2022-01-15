import axios from 'axios';
export const GET_POKEMONS = 'GET_POKEMONS';
export const SET_NAME = 'SET_NAME';
export const GET_POKEMONS_BY_ID = 'GET_POKEMONS_BY_ID';
export const REMOVE_POKEMON = 'REMOVE_POKEMON';
export const SET_PAGE = 'SET_PAGE';

export const getPokemons = ({ page }) => {
    return (dispatch) => {
        axios.get(`http://localhost:3001/pokemons?page=${page ? page : 1}`)
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

export function setPage(page){
    return{
        type: SET_PAGE,
        payload: page
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

