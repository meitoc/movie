import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import AddToFavorite from '../small-component/AddToFavorite';

import CircularProgress from '@mui/material/CircularProgress';

import randomNumber from '../../features/randomNumber';

import { ContextStatus } from '../../App';
//========
export default function Collection(prop) {//prop: collection, pick
  const [movieList,setMovieList] = useState("");
  const { serviceInfo, mobile } = useContext(ContextStatus);
  const [pickFromlist, setPickFromlist] = useState([]);
  useEffect(()=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${serviceInfo.token}`,
      }
    };
    //prop.movielist: "now_playing", "popular", "now_playing", "upcoming"
    fetch(`https://api.themoviedb.org/3/collection/${prop.collection}?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
          setPickFromlist (randomNumber(prop.pick===undefined?(response.parts.length):prop.pick,0,response.parts.length-1));
          setMovieList(response);
          console.log(response);
      })
      .catch(err => console.error(err));
},[serviceInfo,setMovieList,prop]);
  // const handleChange = (event, value) => {
  //   setPage(value);
  // };
  if(movieList!=="")  {
    return(
      <>
        <Container fixed
        sx={{width: "100%", height: 520, display: "flex"}}>
          <ImageList sx={{ width: "100%", maxHeight: 480 , display: "flex", flexDirection: mobile?"column":"row"}}>
          {movieList.parts.map((item,index) => pickFromlist.includes(index)?(
            <ImageListItem key={item.id}  >
              <Link 
                to={`/movies/${item.id}`} 
              >
                <img
                  style={{maxHeight: 450, minWidth: 300}}
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`}
                  srcSet={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`}
                  alt={item.title}
                />
              </Link>
              <ImageListItemBar
                title={item.title}
                subtitle={item.release_date}
                actionIcon={<AddToFavorite id={item.id} />}
              />
            </ImageListItem>
          )
          :
          ""
          )}
          </ImageList>
        </Container>
      </>
    );
  }
  else{
    return(<CircularProgress />);
  }
}