import { useState } from 'react'
import './App.css'
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import Header from './assets/Components/Header';
import HomePage from './assets/Components/HomePage'
import Coinpages from './assets/Components/Coinpages';

function App() {
  
  return (

    <div className='bg-black'>
    <BrowserRouter>
    <Header/>
    <Routes>
  <Route path='/' Component={HomePage}/>
  <Route path='/coins/:id' Component={Coinpages}/>
    </Routes>
      
    </BrowserRouter>
    </div>

  )
}

export default App
