// import { AuthenCheck } from '../../features/authentication/AuthenCheck';
// import FetchFavorite from '../../features/fetch-data/FetchFavorite';
import MovieList from '../../components/movies/MovieList';
import Typography from '@mui/material/Typography';

export default function GenresDetail(prop) {
  return (
    // <AuthenCheck>
    // <FetchFavorite>
    <>
      <Typography variant="h4" gutterBottom>
        {prop.name}
      </Typography>
      <MovieList type="genres" movieList={prop.id} fullScreen={true} />
      </>
  //   </FetchFavorite>
  // </AuthenCheck>
  );
}