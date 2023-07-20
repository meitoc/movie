// import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';

import GenresDetail from './genres/GenresDetail';
import GenresList from './genres/GenresList';
// import { AuthenCheck } from '../features/authentication/AuthenCheck';
// import FetchFavorite from '../features/fetch-data/FetchFavorite';

export default function Genres() {
  const { genresId } = useParams();
  if(genresId===undefined)  {
    return(
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div  style={{display: "flex", flexDirection: "row", flexWrap: "nowrap", width: "100%"}}>
            </div>
              <GenresList />
          </Box>
    );
  }
  else{
    return(
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>    
            <GenresDetail id={genresId} />
          </Box>
    );
  }
  
}