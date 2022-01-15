import React from 'react';
import './Paged.modules.css';

const Paged = ({ pokemonsPerPage, allPokemons, totalPages }) => {
    const pageNumber = [];
    //Redondea todos mis pokemons sobre la cantidad de pokemons que quiero por pagina
    const paginado = Math.ceil(allPokemons/pokemonsPerPage); //la cantidad de páginas es igual a la cantidad de pokemons dividido por la cantidad de pokemons por pagina
    for (let index = 1; index <= paginado; index++) {
         //Push a mi arreglo vacio para que tome el valor de esa itreción
        pageNumber.push(index); 
    }

    return (
        //Renderizo y si tengo ese arreglo lo mapeo y devuelvo en ese arreglo cada uno de los numeros que duvuelva el totalPages
        <>
            <ul className='pageNumbers'>
                {
                    pageNumber?.map(el =>(
                        <li key={el}>
                            <a onClick={() => totalPages(el)}>{el}</a>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default Paged;