import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MovieList from '../../components/movies/MovieList';

import Box from '@mui/material/Box';
//========
export default function GenresList() {
const [genres, setGenres]  = useState([]);
useEffect(()=>{
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    }
  };
  fetch(`https://fakeapi.meitoc.net/redirect/9La81A3m223aawsQ/3/genre/movie/list`, options)
    .then(response => response.json())
    .then(response => {
      setGenres(response.genres);
      console.log(`Response: Fetched genres`)
    })
    .catch(err => {
      console.log("Error when fetch a genres")
      console.error(err);
    });
},[setGenres])
  return(
    <>
    {
      genres.length > 0 ? genres.map((item, index)=>(
        <Box key={index}>
          <Link  to={`/genres/${item.id}`}>
            <Button variant="text">
              <Typography variant="h4" gutterBottom>
                {item.name}
              </Typography>
            </Button>
          </Link>
          <MovieList type="genres" movieList={item.id} pick={4} />
        </Box>
      ))
      : null
    }
    </>
  )
}