import { Link } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MovieList from '../../components/movies/MovieList';
//========
export default function MovieRecommend() {
  return(
    <>
      <Link to="/movielists/nowplaying">
        <Button variant="text">
          <Typography variant="h4" gutterBottom>
            Now Playing
          </Typography>
        </Button>
      </Link>
      <MovieList type="list" movieList="now_playing" pick={4} />
      <Link to="/movielists/popular">
        <Button variant="text">
          <Typography variant="h4" gutterBottom>
            Popular
          </Typography>
        </Button>
      </Link>
      <MovieList type="list"  movieList="popular" pick={8} />
      <Link to="/movielists/top_rated">
        <Button variant="text">
          <Typography variant="h4" gutterBottom>
            Top rated
          </Typography>
        </Button>
      </Link>
      <MovieList type="list" movieList="top_rated" pick={8} />
      <Link to="/movielists/upcoming">
        <Button variant="text">
          <Typography variant="h4" gutterBottom>
            Upcoming
          </Typography>
        </Button>
      </Link>
      <MovieList type="list" movieList="upcoming" pick={8} />
    </>
  );
}