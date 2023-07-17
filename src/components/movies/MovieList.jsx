import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import AddToFavorite from '../small-component/AddToFavorite';
import Pagination from '@mui/material/Pagination';

import CircularProgress from '@mui/material/CircularProgress';

import randomNumber from '../../features/randomNumber';

import { ContextStatus } from '../../App';
//========
export default function MovieList(prop) {//prop: movieList, page
  const [movieList,setMovieList] = useState("");
  const { serviceInfo, mobile } = useContext(ContextStatus);
  const [pickFromlist, setPickFromlist] = useState([]);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(()=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${serviceInfo.token}`,
      }
    };
    //prop.movielist: "now_playing", "popular", "now_playing", "upcoming"
    let url;

    if(prop.type==="list") url = `https://api.themoviedb.org/3/movie/${prop.movieList}?language=en-US&page=${page}`;
    else if(prop.type==="genres") url = `https://api.themoviedb.org/3/list/${prop.movieList}?`;
    else if(prop.type==="collection") url = `https://api.themoviedb.org/3/collection/${prop.movieList}?language=en-US`;
    else if(prop.type==="search") url = `https://api.themoviedb.org/3/search/movie?query=${prop.query}&page=${page}`;
    else if (prop.type==="favorite") url = `https://api.themoviedb.org/3/account/${serviceInfo.account}/favorite/movies?page=${page}`;
    fetch(url, options)
      .then(response => response.json())
      .then(response => {
        if (response.success===false) {
          setMovieList("empty");//some error from server
        }
        else {
          if (prop.type==="genres") response = {
            ...response,
            results: response.items,
            items: undefined,
          };
          else if (prop.type==="collection") {
            response = {
              ...response,
              results: response.parts,
              parts: undefined,
            };
            console.log("collection");
            console.log(response);
          }
          setPickFromlist(randomNumber(prop.pick===undefined?(response.results.length):prop.pick,0,response.results.length-1));
          setMovieList(response);
        }
      })
      .catch(err => console.error(err));
},[serviceInfo,setMovieList,prop,page]);
  if(movieList!=="")  {
    return(
      <>
        <Container fixed
        sx={prop.fullScreen===true?{width: mobile?"80vw":"100vw", display: "flex", flexDirection: "column", alignItems:"center"}:{width: "100%", height: 520, display: "flex"}}>
          <ImageList sx={prop.fullScreen===true?{ width: "100%", display: "flex", justifyContent:"center",flexWrap:"wrap" }:{ width: "100%", maxHeight: 480 , display: "flex", flexDirection: mobile?"column":"row"}}>
          {
            movieList==="empty"? null
            :movieList.results.map((item,index) => pickFromlist.includes(index)?(
              <ImageListItem key={index}  >
                <Link to={`/movies/${item.id}`}>
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
                  actionIcon={
                      <AddToFavorite id={item.id} />
                  }
                />
              </ImageListItem>
            )
            :
            null
          )}
          </ImageList>
          {
            prop.fullScreen===true & movieList.total_pages>2?
            <Pagination count={movieList.total_pages} boundaryCount={mobile?0:2} page={page}  onChange={handleChange} />
            :
            null
          }
        </Container>
      </>
    );
  }
  else{
    return(<CircularProgress />);
  }
}