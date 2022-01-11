import { React, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getPokemons } from '../../redux/action';
import Cards from '../Cards/Cards';
import SearchBar from '../SearchBar/SearchBar';

const Home = () => {
    const dispatch = useDispatch();
    const { allPokemons } = useSelector(state => state);

    useEffect (() => {
        dispatch(getPokemons({}));
    }, [dispatch])

    return (
        <div>
            <div>
                <SearchBar />
            </div>
            
            <div> 
                {
                    allPokemons.map(el => {
                        return <Cards
                        image={el.image} 
                        name={el.name}
                        types={el.types}
                        id={el.id} 
                        key={el.id}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default Home;
