import { AuthenCheck } from '../features/authentication/AuthenCheck';
import MovieList from '../components/movies/MovieList';
import Typography from '@mui/material/Typography';
import FetchFavorite from '../features/fetch-data/FetchFavorite';
import { useContext } from 'react';
import { ContextStatus } from '../App';
export default function Search() {
  const {searchInput} = useContext(ContextStatus);
  return(
    <AuthenCheck>
      <FetchFavorite>
        <Typography variant="h4" gutterBottom>
          Search
        </Typography>
      </FetchFavorite>
      <MovieList type="search" query={searchInput} fullScreen={true} />
    </AuthenCheck>
  );
}