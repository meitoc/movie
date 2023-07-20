import { useState,useContext, useEffect } from 'react';

// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Image from '../Imgage';
import CircularProgress from '@mui/material/CircularProgress';

import { ContextStatus } from '../../App';
// import AddToCartButton from '../../components/movies/AddToCartButton';

export default function Credits(prop) {
  const {serviceInfo, mobile}=useContext(ContextStatus);
  const [creditsInfo,setCreditsInfo]=useState([]);
  useEffect(()=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        // Authorization: `Bearer ${serviceInfo.token}`,
      }
    };
    
    fetch(`https://fakeapi.meitoc.net/redirect/9La81A3m223aawsQ/3/movie/${prop.movie}/credits?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        setCreditsInfo(response);
        console.log("Fetched the movie's credit data.")
      })
      .catch(err => {
        console.error(err);
        console.log("Error when fetch credit data!")
      });
},[serviceInfo,prop,setCreditsInfo]);

if(creditsInfo.cast!==undefined)
  return (
    <Container fixed
      sx={{width: mobile?"50%":"100%", height: 200, display: "flex"}}
    >
      <ImageList sx={{ width: "100%", maxHeight: 170 , display: "flex", flexDirection: mobile?"column":"row"}}>
        {creditsInfo.cast.map((actor,index) => (
            <ImageListItem key={index}  >
              <Image
                style={{maxHeight: 150, minWidth: 150}}
                src={
                  actor.profile_path!==null && actor.profile_path!==undefined?
                  `https://www.themoviedb.org/t/p/w138_and_h175_face${actor.profile_path}`
                  :
                  ""
                }
                alt={actor.name}
              />
              <ImageListItemBar
                title={actor.name}
                subtitle={actor.release_date}
              />
          </ImageListItem>
          )
        )}
      </ImageList>
    </Container>
  );
  else return (<CircularProgress />);
}