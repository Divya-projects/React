import React from 'react'
import { Link } from 'react-router-dom'
import Logo  from '../assets/imdb-logo.png'

const NavBar = () => {
    return <>
    <div>
        <div className='flex space-x-8 items-center pl-8 py-8'>
            <Link to="/">
                 <img className='w-14' src={Logo} alt='IMDb icon'/>
             </Link>
             <Link to="/movies" className='text-blue-600 text-2xl font-bold'>Movies</Link>
             <Link to="/watchlist" className='text-red-600 font-bold text-2xl'>Watchlist</Link>
        </div>
    </div>
    </>
}

export default NavBar;