import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getPokemons } from '../../redux/action';
import Cards from '../Cards/Cards';
import Paged from '../Paged/Paged';
import SearchBar from '../SearchBar/SearchBar';

const Home = () => {
    const dispatch = useDispatch();
    const { allPokemons } = useSelector(state => state);
    const [currentPage, SetCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(9);
    const indexLastPokemon = currentPage * pokemonsPerPage;
    const indexFirtsPokemon = indexLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexFirtsPokemon, indexFirtsPokemon);
    console.log(currentPokemons);

    const totalPages = (pageNumber) => {
        SetCurrentPage(pageNumber);
    }

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
                    currentPokemons?.length > 0 ? 
                    currentPokemons?.length > 0 && 
                    currentPokemons.map(el => {
                        return <Cards
                        image={el.image} 
                        name={el.name}
                        types={el.types}
                        id={el.id} 
                        key={el.id}
                        />
                    })

                    :

                    <div>Loading...</div>
                }
            </div>

                <div>
                    <Paged 
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    totalPages={totalPages}
                    />
                </div>
        </div>
    )
}

export default Home;
