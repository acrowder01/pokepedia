 import { useEffect, useState, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
// components
import Nav from './components/Nav'
// pages
import Home from './pages/Home'
import Login from './pages/Login'
import PokemonList from './pages/PokemonList/index.js'
// contexts
import UserContext from './contexts/UserContext.js'
// css
import './App.css';
import axios from 'axios'

const App = () => {
  // In able for us to use our context, we import first, then we can use the useContext hook to access our context
  // const user = useContext(UserContext)
  // console.log(user)

  // We will pass on our user to all of App's children via the Provider value prop

  const [user, setUser] = useState('')
  const [pokeList, setPokeList] = useState([])

  useEffect(async () => {
    fetchPokemon()
    //Empty array brackets = dependency array, if empty it will call useEffect only once when the DOM component load. 
     }, [])

   const fetchPokemon = async() => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=118") 

        setPokeList(response.data.results)
        
     } catch(error) {
       console.log(error)
     }
  }

//  console.log('pokeList', pokeList)

  return (
    <div className="App">

      {/* All context comes with the Provider Component. This allows us to use this as a wrapper and share information to all of its children. We need the value prop inside our provider. */}
      <UserContext.Provider value={user}>
        <Nav />

        {/* We need to wrap our all of our routes inside react router Routes component */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login setUser={setUser} />} />
          <Route path='pokemon/list' element={<PokemonList pokeList={pokeList} />} />
        </Routes>
          
      </UserContext.Provider>

    </div>
  );
}

export default App;