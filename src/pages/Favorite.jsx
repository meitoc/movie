import { AuthenCheck } from '../features/authentication/AuthenCheck';
import MovieList from '../components/movies/MovieList';
import Typography from '@mui/material/Typography';
import FetchFavorite from '../features/fetch-data/FetchFavorite';
export default function Favorite() {
  return(
    <AuthenCheck>
      <FetchFavorite>
        <Typography variant="h4" gutterBottom>
          Favorite
        </Typography>
      </FetchFavorite>
      <MovieList type="favorite" movieList="popular" fullScreen={true} />
    </AuthenCheck>
  );
}