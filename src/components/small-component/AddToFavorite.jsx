import { useState, useContext, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { ContextStatus } from '../../App';
//========
export default function AddToFavorite(prop) {//prop: id
  const { serviceInfo, favoriteData, setFavoriteData } = useContext(ContextStatus);
  const [favoriteStatus, setFavoriteStatus] = useState(false);
  useEffect(()=>{
    setFavoriteStatus (Array.isArray(favoriteData) && favoriteData.some(e=>e.id===prop.id));
  },[favoriteData,prop]);
  function updateFavorite () {
    if(favoriteStatus) setFavoriteData(favoriteData.filter(item => item.id !== prop.id));
    else setFavoriteData(favoriteData.concat({id: prop.id}));
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${serviceInfo.token}`,
      },
      body: JSON.stringify({media_type: 'movie', media_id: prop.id, favorite: (!favoriteStatus)})
    };
    setFavoriteStatus(!favoriteStatus);
    fetch('https://api.themoviedb.org/3/account/20129309/favorite', options)
      .then(response => response.json())
      .then(response => {
        console.log("Response: updated favorite list");
        console.log(response);
      })
      .catch(err => {
        console.log("Error when update favorite list");
        console.error(err);
      });
  }

  return(
    <IconButton
      sx={favoriteStatus===true?{ color: 'rgba(255, 0, 100, 0.54)' }:{ color: 'inherit' }}
      aria-label={`info about ${prop.id}`}
      onClick={updateFavorite}
      >
      <FavoriteIcon />
    </IconButton>
  );
}