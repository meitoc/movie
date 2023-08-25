import { AuthenCheck } from '../features/authentication/AuthenCheck';
import FavoriteList from '../components/movies/FavoriteList';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FetchFavorite from '../features/fetch-data/FetchFavorite';
export default function Favorite() {
  return(
    <AuthenCheck>
      <FetchFavorite>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Typography variant="h4" gutterBottom>
            Favorite
          </Typography>
          <FavoriteList type="favorite" movieList="popular" fullScreen={true} />
        </Box>
      </FetchFavorite>
    </AuthenCheck>
  );
}