import { AuthenCheck } from '../features/authentication/AuthenCheck';
import MovieList from '../components/movies/MovieList';
import Typography from '@mui/material/Typography';
import FetchFavorite from '../features/fetch-data/FetchFavorite';
import SearchInput from '../components/filter/SearchInput';
import { createContext, useState } from 'react';

export const ContextSearch = createContext();

export default function Search() {

  const [sortBy, setSortBy] = useState ("recommend");
  const [searchInput, setSearchInput]= useState(null);
  const [selectCategory, setSelectCategory] = useState (null);

  return(
    <AuthenCheck>
      <ContextSearch.Provider
      value={{
        sortBy, setSortBy,
        searchInput, setSearchInput,
        selectCategory, setSelectCategory,
      }}>
        <FetchFavorite>
          <Typography variant="h4" gutterBottom>
            Search
          </Typography>
          <SearchInput/> 
        </FetchFavorite>
        {
          searchInput!=="" && searchInput!==undefined && searchInput!==null?
          <MovieList type="search" query={searchInput} fullScreen={true} />
          : null
        }
      </ContextSearch.Provider>
    </AuthenCheck>
  );
}