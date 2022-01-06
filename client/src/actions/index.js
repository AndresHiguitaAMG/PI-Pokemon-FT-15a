import axios from 'axios';

export function getPokemons(){
    return async function(dispatch){
        var todosLosPokemons = await axios("http://localhost:3001/pokemon");
        return dispatch({
           type: 'GET_POKEMONS',
           payload: todosLosPokemons.data
        })
    }
}
