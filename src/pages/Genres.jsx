// import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';

import GenresDetail from './genres/GenresDetail';
import GenresList from './genres/GenresList';
// import { AuthenCheck } from '../features/authentication/AuthenCheck';
import FetchFavorite from '../features/fetch-data/FetchFavorite';

export default function Genres() {
  const { genresId } = useParams();
    return(
        <FetchFavorite>
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {/* <div  style={{display: "flex", flexDirection: "row", flexWrap: "nowrap", width: "100%"}}>
            </div> */}
            {
              genresId===undefined?
              <GenresList />
              :<GenresDetail id={genresId} />
            }
          </Box>
        </FetchFavorite>
    );
}