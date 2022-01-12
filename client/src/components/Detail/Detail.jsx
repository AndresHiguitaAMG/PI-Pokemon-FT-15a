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

    const handleGoToBack = () => {
        history.goBack();
    }

    return (
        <div>
            <button onClick={handleGoToBack}>To return ◀</button>

            {
                pokemons.name ? 
                <>
                <div>
                    <img src={pokemons.image} alt="img not found" width="400px" heigth="290px" />
                </div>
                
                <div>
                    <h2>{pokemons.name}</h2>
                </div>

                <div>
                    <h3>{pokemons.types}</h3>
                </div>
                </>

                :

                <div>
                    Loading...
                </div>
            }
        </div>
    )
}

export default Detail;
