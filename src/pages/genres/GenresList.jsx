import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MovieList from '../../components/movies/MovieList';
import { ContextStatus } from '../../App';
//========
export default function GenresList() {
const [genres, setGenres]  = useState([]);
const {serviceInfo}=useContext(ContextStatus)
useEffect(()=>{
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${serviceInfo.token}`,
    }
  };
  fetch(`https://api.themoviedb.org/3/genre/movie/list`, options)
    .then(response => response.json())
    .then(response => {
      setGenres(response.genres);
      console.log(`Response: Fetched genres`)
    })
    .catch(err => {
      console.log("Error when fetch a genres")
      console.error(err);
    });
},[setGenres,serviceInfo])
  return(
    <>
    {
      genres.length > 0 ? genres.map((item, index)=>(
        <>
          <Link key={index} to={`/genres/${item.id}`}>
            <Button variant="text">
              <Typography variant="h4" gutterBottom>
                {item.name}
              </Typography>
            </Button>
          </Link>
          <MovieList type="genres" movieList={item.id} pick={4} />
        </>
      ))
      : null
    }
    </>
  )
}