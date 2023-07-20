// import MovieList from '../components/movies/MovieList';
import MovieSearch from '../components/movies/MovieSearch';
import Typography from '@mui/material/Typography';
// import FetchFavorite from '../features/fetch-data/FetchFavorite';
import SearchInput from '../components/filter/SearchInput';
import { createContext, useState } from 'react';
import GenresSelect from '../components/filter/GenresSelect';
import Box from '@mui/material/Box';
import AdultSelect from '../components/filter/AdultSelect';

export const ContextSearch = createContext();

export default function Search() {

  const [sortBy, setSortBy] = useState ("recommend");
  const [searchInput, setSearchInput]= useState(null);
  const [selectGenres, setSelectGenres] = useState (0);
  const [selectAdult, setSelectAdult] = useState (false);

  return(
      <ContextSearch.Provider
      value={{
        sortBy, setSortBy,
        searchInput, setSearchInput,
        selectGenres, setSelectGenres,
        selectAdult, setSelectAdult,
      }}>
        {/* <FetchFavorite> */}
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant="h4" gutterBottom>
              Search
            </Typography>
            <SearchInput />
            <AdultSelect />
            <GenresSelect />
          </Box>
        {/* </FetchFavorite> */}
        {
          searchInput!==undefined && searchInput!==null?
          <MovieSearch  adult = {selectAdult} query={searchInput} genre={selectGenres} fullScreen={true} />
          : null
        }
        
      </ContextSearch.Provider>
  );
}