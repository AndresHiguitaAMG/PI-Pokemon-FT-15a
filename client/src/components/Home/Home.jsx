import { React, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getPokemons, setPage } from '../../redux/action';
import Cards from '../Cards/Cards';
// import Paged from '../Paged/Paged';

const Home = () => {
    const dispatch = useDispatch();
    const {allPokemons, name, page}  = useSelector(state => state);
    // const [currentPage, SetCurrentPage] = useState(1);
    // const [pokemonsPerPage] = useState(9);
    // const indexLastPokemon = currentPage * pokemonsPerPage;
    // const indexFirtsPokemon = indexLastPokemon - pokemonsPerPage;
    // const currentPokemons = allPokemons.slice(indexFirtsPokemon, indexFirtsPokemon);
    // console.log(currentPokemons); 

    useEffect (() => {
        dispatch(getPokemons({}));
    }, [dispatch])

    // const totalPages = (pageNumber) => {
    //     SetCurrentPage(pageNumber);
    // }

    const handleClickPage = (page) =>{
        dispatch(getPokemons({ page, name }))
        dispatch(setPage(page))
}

    return (
        <div>
            <div>
                {
                allPokemons?.result?.map(el => {
                    return <Cards
                    image={el.image} 
                    name={el.name}
                    types={el.types.name}
                    id={el.id} 
                    key={el.id}
                    />
                })
                }
            </div>
            <button disabled={page - 1 === 0} onClick={() =>{handleClickPage(page - 1)}}>Back</button>
            <label>{page}</label>
            <button disabled={allPokemons?.count <= (page * 9)} onClick={() =>{handleClickPage(page + 1)}}>Next</button>

            

            {/* <div>
                    <Paged 
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    totalPages={totalPages}
                    />
                </div> */}
        </div>
    )
}

export default Home;