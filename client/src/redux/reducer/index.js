import { GET_POKEMONS, GET_POKEMONS_BY_ID, REMOVE_POKEMON, SET_PAGE } from '../action/index';

const initialState = {
    allPokemons: [],
    pokemons: [],
    name: "",
    page: 1
}

export default function reducer (state = initialState, { type, payload }) {
    switch (type) {
        case GET_POKEMONS:
            return {
                ...state,
                allPokemons: payload,
                pokemons: payload
            }

            case SET_PAGE:
            return{
                ...state,
                page: payload
            }
            
        // case SET_NAME:
        //     return {
        //         ...state,
        //         name: payload
        //     }
            
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