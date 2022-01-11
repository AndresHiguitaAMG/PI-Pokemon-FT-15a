import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPokemonsById, removePokemon } from '../../redux/action';

const Detail = (props) => {
    const { id } = props.match.params;
    const { pokemons } = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect (() => {
        dispatch(getPokemonsById(id));
        return () => {
            dispatch(removePokemon());
        }
    }, [dispatch, id])
    return (
        <div>
            
        </div>
    )
}

export default Detail;
