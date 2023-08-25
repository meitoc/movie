// import { AuthenCheck } from '../../features/authentication/AuthenCheck';
import FetchFavorite from '../../features/fetch-data/FetchFavorite';
import MovieList from '../../components/movies/MovieList';
import Typography from '@mui/material/Typography';
export default function UpComing() {
  return(
      <FetchFavorite>
        <Typography variant="h4" gutterBottom>
          Upcoming!
        </Typography>
        <MovieList type="list" movieList="upcoming" fullScreen={true} />
      </FetchFavorite>
  );
}