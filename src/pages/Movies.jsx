// import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';

import MovieDetail from './movies/MovieDetail';
import MovieRecommend from './movies/MovieRecommend';
import { AuthenCheck } from '../features/authentication/AuthenCheck';
import FetchFavorite from '../features/fetch-data/FetchFavorite';

export default function Movies() {
  const { movieId } = useParams();
  console.log("movieId");
  console.log(movieId);
  if(movieId===undefined)  {
    return(
      <AuthenCheck loginForm={false} >
        <FetchFavorite>
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div  style={{display: "flex", flexDirection: "row", flexWrap: "nowrap", width: "100%"}}>
            </div>
              <MovieRecommend />
          </Box>
        </FetchFavorite>
      </AuthenCheck>
    );
  }
  else{
    return(
      <AuthenCheck>
        <FetchFavorite>
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>    
            <MovieDetail movie={movieId} />
          </Box>
        </FetchFavorite>
      </AuthenCheck>
    );
  }
  
}