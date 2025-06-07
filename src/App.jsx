// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import WatchList from './components/WatchList'
import Home from './components/Home'
import Movies from './components/Movies'
import WatchListContextWrapper from './contexts/WatchListContext'

function App() {
  return (
    <>
      {/* <div className="bg-red-500 text-white p-4">Test</div>
      <h1 className="text-3xl font-bold underline text-center">Hello world!</h1> */}
      <BrowserRouter>
        <NavBar />

        <WatchListContextWrapper>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/watchList' element={<WatchList />} />
            <Route path='/movies' element={<Movies />} />
          </Routes>
        </WatchListContextWrapper>
      
      </BrowserRouter>
    </>
  )
}

export default App
