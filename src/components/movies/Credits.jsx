import { useState,useContext, useEffect } from 'react';

// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
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
  const { mobile}=useContext(ContextStatus);
  const [creditsInfo,setCreditsInfo]=useState([]);
  const [creditsDetail,setCreditsDetail]=useState(null);
  useEffect(()=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    };
    fetch(`https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/movie/${prop.movie}/credits?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        setCreditsInfo(response);
        console.log("Fetched a credit data.")
      })
      .catch(err => {
        console.error(err);
        console.log("Error when fetch a credit data!")
      });
  },[prop.movie,setCreditsInfo]);
  function fetchCreditDetail (creditsId) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    };
    fetch(`https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/credit/${creditsId}`, options)
      .then(response => response.json())
      .then(response => {
        setCreditsDetail(response);
        console.log("Fetched the movie's credit data.")
      })
      .catch(err => {
        console.error(err);
        console.log("Error when fetch credit data!")
      });
  }
if(creditsInfo.cast!==undefined)
  return (
    <>
      <Container fixed
        sx={{width: mobile?"50%":"100%", height: 200, display: "flex"}}
      >
        <ImageList sx={{ width: "100%", maxHeight: 170 , display: "flex", flexDirection: mobile?"column":"row"}}>
          {creditsInfo.cast.map((actor,index) => (
              <ImageListItem 
              key={index} 
              style={{cursor: 'pointer'}}
              onClick = {()=> fetchCreditDetail(actor.credit_id)}
              >
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
      {
        creditsDetail===null?null:
        <Container fixed
        sx={{width: mobile?"50%":"100%", display: "flex", flexDirection: "column"}}
        >
          <img 
          style={{ maxWidth: 300}}
          src={`https://image.tmdb.org/t/p/original${creditsDetail.person.profile_path}`} />
          <Typography variant="body1" gutterBottom>
            Original name: {creditsDetail.person.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Job: {creditsDetail.job}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Credit: {creditsDetail.credit_type}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Department: {creditsDetail.department}
          </Typography>
          {creditsDetail.person.adult?<Typography variant="body1" gutterBottom>18+</Typography>: null}
        </Container>
      }
    </>
  );
  else return (<CircularProgress />);
}