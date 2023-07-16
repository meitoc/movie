import { AuthenCheck } from '../../features/authentication/AuthenCheck';
import FetchFavorite from '../../features/fetch-data/FetchFavorite';
import MovieList from '../../components/movies/MovieList';
import Typography from '@mui/material/Typography';

export default function NowPlaying() {
  return(
    <AuthenCheck>
      <FetchFavorite>
        <Typography variant="h4" gutterBottom>
          Now Playing
        </Typography>
        <MovieList type="list" movieList="now_playing" fullScreen={true} />
      </FetchFavorite>
    </AuthenCheck>
  );
}