import React, { useEffect, useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import "./home.css";
import Favorite from '../favorite/Favorite';
import Library from '../library/Library';
import Feed from '../feed/Feed';
import Trending from '../trending/Trending';
import Player from '../player/Player';
import Sidebar from '../../component/sidebar';
import Login from '../auth/Login';
import { setClientToken } from '../../spotify';

const Home = () => {
  const[token,setToken]=useState("");

  useEffect(()=>{
    const token =  window.localStorage.getItem("token")
const hash = window.location.hash
window.location.has="";
if(!token && hash){
  const _token=(hash.split("&")[0].split("=")[1])
  window.localStorage.setItem("token", _token);
  setToken(_token);
  setClientToken(_token)
}else{
  setToken(token)
  setClientToken(token)
}
  },[])
  return (!token ? <Login/>:
    <BrowserRouter>
   <div className='main-body'>
    <Sidebar/>
   <Routes>
      <Route path="/" element={<Library/>}/>
      <Route path="/feed" element={<Feed/>}/>
      <Route path='/trending' element={<Trending/>}/>
      <Route path='player' element={<Player/>}/>
     <Route path='/favorite' element={<Favorite/>}/>
      </Routes>   
   </div>
      </BrowserRouter>
  )
}

export default Home
