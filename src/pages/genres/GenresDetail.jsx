import FetchFavorite from '../../features/fetch-data/FetchFavorite';
import MovieList from '../../components/movies/MovieList';
import Typography from '@mui/material/Typography';

export default function GenresDetail(prop) {
  return (
    <FetchFavorite>
      <Typography variant="h4" gutterBottom>
        {prop.name}
      </Typography>
      <MovieList type="genres_list" movieList={prop.id} fullScreen={true} />
    </FetchFavorite>
  );
}