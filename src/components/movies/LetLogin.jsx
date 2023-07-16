import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//========
export default function LetLogin () {
  
    return(
        <Container fixed
        sx={{width:"100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center" }}>
          <Typography variant="h2" gutterBottom>
            Let&apos;s login to view NEW movie info!
          </Typography>
          <Link 
            to={`/login`} 
          >
            <Button variant="outlined" size="large">
              LOGIN
            </Button>
          </Link>
        </Container>
    );
}