import React, { useEffect, useState } from 'react'
import './player.css'
import {useLocation} from 'react-router-dom'
import apiClient from '../../spotify';
import SongCard from '../../component/songcard/SongCard';
import Queue from '../../component/queue/Queue';
import AudioPlay from '../../component/audioPlay';
import Widgets from '../../component/widgets/Widgets';

const Player = () => {
  const location = useLocation();
  const [tracks,setTracks]= useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

//  useEffect(()=>{
//     if(location.state){
//       apiClient.get("https://api.spotify.com/v1/playlists/"+location.state?.id+"/tracks")
//       .then((res)=>{
//         setTracks(res.data.items)
//         setCurrentTrack(res.data.items[0].track)
//       })
//     }
  // },[location.state])

  useEffect(() => {
    if (location.state) {
      apiClient
        .get("playlists/" + location.state?.id + "/tracks")
        .then((res) => {
          setTracks(res.data.items);
          setCurrentTrack(res.data?.items[0]?.track);
          console.log(res.data?.items[0]?.track)
        });
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track);
  }, [currentIndex, tracks]);

  return (
    <div className='screen-container flex'>
     <div className='left-player-body'>
    <AudioPlay 
    currentTrack={currentTrack}
    total={tracks} 
    isPlaying={true} 
    currentIndex={currentIndex}
     setCurrentIndex={setCurrentIndex}
     />
     <Widgets artistID={currentTrack?.album?.artists[0]?.id}/>
     </div>
     <div className='right-player-body'>
      <SongCard album={currentTrack?.album}/>
      <Queue tracks={tracks} setCurrentIndex={setCurrentIndex}/>
     </div>
    </div>
  )
}

export default Player
