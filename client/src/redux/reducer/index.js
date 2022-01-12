import { GET_POKEMONS, SET_NAME, GET_POKEMONS_BY_ID, REMOVE_POKEMON } from '../action/index';

const initialState = {
    allPokemons: [],
    pokemons: [],
    name: ""
}

export default function reducer (state = initialState, { type, payload }) {
    switch (type) {
        case GET_POKEMONS:
            return {
                ...state,
                allPokemons: payload,
                pokemons: payload
            }
            
        case SET_NAME:
            return {
                ...state,
                name: payload
            }
            
        case GET_POKEMONS_BY_ID:
            return {
                ...state,
                pokemons: payload
            }
            
        case REMOVE_POKEMON:
            return {
                ...state,
                pokemons: payload
            }   
            default:
                return state;
            }
        }