import { AuthenCheck } from '../../features/authentication/AuthenCheck';
import FetchFavorite from '../../features/fetch-data/FetchFavorite';
import MovieList from '../../components/movies/MovieList';
import Typography from '@mui/material/Typography';
export default function TopRated() {
  return(
    <AuthenCheck>
      <FetchFavorite>
        <Typography variant="h4" gutterBottom>
          Top Movies
        </Typography>
        <MovieList type="list" movieList="top_rated" fullScreen={true} />
      </FetchFavorite>
    </AuthenCheck>
  );
}