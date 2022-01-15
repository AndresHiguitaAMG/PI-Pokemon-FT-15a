// import { React, useState } from 'react'
// import { useDispatch } from 'react-redux';
// import { getPokemons, setName } from '../../redux/action';

// const SearchBar = () => {
//     const dispatch = useDispatch();
//     const [input, setInput] = useState(""); //Tiene el valor a mostrar

//     const handleOnChangeSearch = (e) => {
//         e.preventDefault();
//         setInput(e.target.value);
//     }

//     const HandleOnSubmitSearch = (e) => {
//         e.preventDefault();
//         dispatch(setName(input)); //Guarda el input en el store
//         dispatch(getPokemons({ name: input }));
//         setInput("");
//     }

//     return (
//         <div>
//             <form>
//                 <input 
//                 type='text' 
//                 placeholder='search'
//                 value={input}
//                 onChange={handleOnChangeSearch}
//                 />
//                 <button
//                 type='submit'
//                 onClick={HandleOnSubmitSearch}
//                 >🔍</button>
//             </form>        
//         </div>
//     )
// }

// export default SearchBar;
