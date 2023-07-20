import { useState,useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '@mui/material/Avatar';
import Credits from './Credits';
import MovieList from './MovieList';
import { ContextStatus } from '../../App';
import AddToFavorite from '../small-component/AddToFavorite';
import Image from '../Imgage';
import ExplicitIcon from '@mui/icons-material/Explicit';

export default function AMovie(prop) {
  
  const {darkMode,mobile}=useContext(ContextStatus);
  const [movieInfo,setMovieInfo]=useState(null);
  useEffect(()=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    };
    console.log(`Fetching the movie ${prop.movie}`);
    fetch( `https://fakeapi.meitoc.net/redirect/9La81A3m223aawsQ/3/movie/${prop.movie}?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setMovieInfo(response);
        console.log(`Response: Fetched the movie ${prop.movie}`)
      })
      .catch(err => {
        console.log("Error when fetch a specific movie")
        console.error(err);
      });
},[prop,setMovieInfo]);
if(movieInfo!==null)
  return (
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 1, sm: 2, md: 2 }} >
          <Grid item xs={1} sm={2} md={2} >
            <Typography gutterBottom variant="h4" component="div">
                {movieInfo.original_title===movieInfo.title ? movieInfo.title : `${movieInfo.title} (${movieInfo.original_title})`}
            </Typography>
            <Card sx={{ backgroundColor: darkMode ? 'rgb(10,100,100)' : 'rgb(210,210,255)', display:"flex", flexDirection: mobile?"column":"row"}} >
              <CardContent>
                {
                  movieInfo.poster_path!==null && movieInfo.poster_path!==undefined?
                    <Image
                      style={{maxHeight: 400, minWidth: 250}}
                      src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieInfo.poster_path}`}
                      alt={movieInfo.id}
                    />
                  :
                    null
                }
              </CardContent>
              <CardActions sx={{display:"flex", padding:1, flexDirection:"column", justifyContent:"center", alignItems:"start"}}>
                <Box>
                  <Chip label= {movieInfo.release_date} />
                  <Chip label= {`${movieInfo.runtime} min`} />
                  <Chip label= {movieInfo.production_countries!==undefined? movieInfo.production_countries.map(e=> `${e.iso_3166_1} `):""} />
                </Box>
                <Box>
                  {movieInfo.adult?<IconButton
                    aria-label={`adult ${movieInfo.title}`}
                  >
                    <ExplicitIcon />
                  </IconButton>
                  :null}
                  <AddToFavorite id={movieInfo.id} />
                  <IconButton
                    aria-label={`share ${movieInfo.title}`}
                  >
                    <ShareIcon />
                  </IconButton>
                </Box>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Genres:
                  </Typography>
                </Box>
                <Box>
                  {movieInfo.genres!==undefined? movieInfo.genres.map(e=>(
                    <Link key={e.id} to={`/genres/${e.id}`} >
                      <Chip label={e.name} variant="outlined" />
                    </Link>
                  )):""}
                </Box>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Company:
                  </Typography>
                </Box>
                <Box>
                  {movieInfo.production_companies!==undefined?
                    movieInfo.production_companies.map(e=>
                      {
                        return e.logo_path!==null && e.logo_path!==undefined?
                        <Chip
                          avatar={<Avatar alt={e.name} src={`https://image.tmdb.org/t/p/original${e.logo_path}`} />}
                          label={e.name}
                          variant="outlined"
                          key={e.id}
                        />
                        :
                        ""
                      }
                    )
                    :
                    ""
                  }
                </Box>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={2} sm={4} md={4} >
              <Card sx={{padding:"10px", backgroundColor: darkMode ? 'rgb(10,100,100)' : 'rgb(210,210,255)'}}>
                <Typography variant="body2" color="text.secondary" >{movieInfo.overview}</Typography>
                <Chip label={movieInfo.tagline} />
              </Card>
          </Grid>
          <Grid item xs={2} sm={4} md={4} >
            <Card sx={{ backgroundColor: darkMode ? 'rgb(10,100,100)' : 'rgb(210,210,255)'}}>
              <CardContent>
                Rating: {(movieInfo.vote_average*10).toFixed(2)}%
                / {movieInfo.vote_count} votes
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2} sm={4} md={4} >
            <Card sx={{ backgroundColor: darkMode ? 'rgb(10,100,100)' : 'rgb(210,210,255)', padding:1}}>
              <Typography variant="h6" gutterBottom >
                Actor:
              </Typography>
              {movieInfo.id!==undefined?<Credits movie={movieInfo.id} />:<CircularProgress />}
            </Card>
          </Grid>
          {movieInfo.belongs_to_collection!==undefined && movieInfo.belongs_to_collection!==null?
            <Grid item xs={2} sm={4} md={4} >
              <Card sx={{ backgroundColor: darkMode ? 'rgb(10,100,100)' : 'rgb(210,210,255)', padding:1}}>
                <Typography variant="h6" gutterBottom >
                  Collection:
                </Typography>
                  <MovieList type="collection" movieList={movieInfo.belongs_to_collection.id}  />
              </Card>
            </Grid>
            :null
          }
        </Grid>
  );
  else return (<CircularProgress />);
}