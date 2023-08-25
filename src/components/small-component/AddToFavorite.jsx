import { useState, useContext, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { ContextStatus } from '../../App';
//========
export default function AddToFavorite(prop) {//prop: id
  const { loginStatus, favoriteData, setFavoriteData , setShowLoginForm} = useContext(ContextStatus);
  const [favoriteStatus, setFavoriteStatus] = useState(false);
  useEffect(()=>{
    setFavoriteStatus (Array.isArray(favoriteData) && favoriteData.some(e=>e.id===prop.id));
    // console.log(favoriteData);//test
  },[favoriteData,prop]);

  function updateFavorite () {
    if(loginStatus==true){
      setFavoriteStatus(!favoriteStatus);
      let session = localStorage.getItem('loginSession');
      if(favoriteStatus) setFavoriteData(favoriteData.filter(item => item.id !== prop.id));
      else setFavoriteData(favoriteData.concat({id: prop.id}));
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
        body: JSON.stringify({media_type: 'movie', media_id: prop.id, favorite: (!favoriteStatus)})
      };
      
      fetch('https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/account/favorite/change', options)
        .then(response => response.json())
        .then(response => {
          if(response.status){
            console.log("Response: updated favorite list");
            console.log(response);
          }
          else {
            console.log("Error: can not update favorite list");
            console.log(response);
          }
        })
        .catch(err => {
          console.log("Error when update favorite list");
          console.error(err);
        });
      } else {
        setShowLoginForm(true);
      }
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