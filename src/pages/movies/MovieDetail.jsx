import Box from '@mui/material/Box';
import AMovie from '../../components/movies/AMovie';

export default function MovieDetail(prop) {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <AMovie movie={prop.movie} />
      </Box>
  )
}