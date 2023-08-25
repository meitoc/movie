// import { AuthenCheck } from '../../features/authentication/AuthenCheck';
import FetchFavorite from '../../features/fetch-data/FetchFavorite';
import MovieList from '../../components/movies/MovieList';
import Typography from '@mui/material/Typography';
export default function Popular() {
  return(
      <FetchFavorite>
        <Typography variant="h4" gutterBottom>
          Popular Movies
        </Typography>
        <MovieList type="list" movieList="popular" fullScreen={true} />
      </FetchFavorite>
  );
}