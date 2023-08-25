// import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';

import AMovie from '../components/movies/AMovie';
import MovieRecommend from './movies/MovieRecommend';
// import { AuthenCheck } from '../features/authentication/AuthenCheck';
import FetchFavorite from '../features/fetch-data/FetchFavorite';

export default function Movies() {
  const { movieId } = useParams();
  console.log("movieId");
  console.log(movieId);
  return(
      <FetchFavorite>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {movieId===undefined?<MovieRecommend />:<AMovie movie={movieId} />}
        </Box>
      </FetchFavorite>
  );
  
}