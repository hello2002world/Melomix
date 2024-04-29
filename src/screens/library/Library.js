import React, { useEffect, useState } from 'react';
import APIKit from '../../spotify';
import './library.css';
import {useNavigate} from 'react-router-dom';
import {AiFillPlayCircle} from 'react-icons/ai';
import { IconContext } from 'react-icons';

const Library = () => {
  const [playlists,setPlaylists] =useState([])
  useEffect(() => {
    APIKit.get("me/playlists").then(function (response) {
      setPlaylists(response.data.items);
      console.log(response.data.items)
    });
  }, []);
  const navigate = useNavigate()

  const playPlaylist = (id)=>{
navigate("/player", {state:{id:id}})
  }
  return (
    <div className='screen-container'>
     <div className=" library-body">
     {playlists?.map((item)=>(
     <div className='playlist-card' key={item.id} onClick={()=>playPlaylist(item.id)}>
      <img src={item.images[0].url} className='playlist-image' alt='playlist-art'/>
      <p className='playlist-title'>{item.name}</p>
      <p className='playlist-subtitle'>{item.tracks.total} Songs</p>
      <div className='playlist-fade'>
        <IconContext.Provider value={{size:"50%", color:"#E99d72"}}>
          <AiFillPlayCircle/>
        </IconContext.Provider>
      </div>
      </div>
     ))}
     </div>
    </div>
  )
}

export default Library
