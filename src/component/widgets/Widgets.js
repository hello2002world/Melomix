import React, { useEffect, useState } from 'react';
import './widgets.css'
import apiClient from '../../spotify'
import WidgetsCard from './WidgetsCard';

const Widgets = ({artistID}) => {
  const [similar, setSimilar]= useState([]);
  const [featured,setFeatured] = useState([]);
  const [newRelease,setNewRelease]= useState([]);
  console.log(similar, featured, newRelease)

  useEffect(() => {
    if (artistID) {
      apiClient
        .get(`/artists/${artistID}/related-artists`)
        .then((res) => {
          console.log(res.data)
          const a = res.data?.artists.slice(0, 3);
          setSimilar(a);
        })
        .catch((err) => console.error(err));

      apiClient
        .get(`/browse/featured-playlists`)
        .then((res) => {
          const a = res.data?.playlists.items.slice(0, 3);
          setFeatured(a);
        })
        .catch((err) => console.error(err));

      apiClient
        .get(`/browse/new-releases`)
        .then((res) => {
          const a = res.data?.albums.items.slice(0, 3);
          setNewRelease(a);
        })
        .catch((err) => console.error(err));
    }
  }, [artistID]);
  return (
   <>
    <div className='widgets-body flex'>
      <WidgetsCard title="Similar artists" similar={similar}/>
      <WidgetsCard title="Made for you" featured={featured}/>
      <WidgetsCard title="New Release"  newRelease={newRelease}/>
    </div>
   </>
  )
}

export default Widgets;
