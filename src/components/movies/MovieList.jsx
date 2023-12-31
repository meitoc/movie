import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import AddToFavorite from '../small-component/AddToFavorite';
import IconButton from '@mui/material/IconButton';
import ExplicitIcon from '@mui/icons-material/Explicit';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';

import randomNumber from '../../features/randomNumber';
import Image from '../Imgage';

import { ContextStatus } from '../../App';
//========
export default function MovieList(prop) {//prop: movieList, page
  const [movieList,setMovieList] = useState("");
  const {mobile } = useContext(ContextStatus);
  const [pickFromlist, setPickFromlist] = useState([]);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(()=>{
    function fetchData () {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          // Authorization: `Bearer ${serviceInfo.token}`,
        }
      };
      //prop.movielist: "now_playing", "popular", "now_playing", "upcoming"
      let url;
  
      if(prop.type==="list") url = `https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/movie/${prop.movieList}?language=en-US&page=${page}`;
      else if(prop.type==="genres") url = `https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/list/${prop.movieList}`;
      else if(prop.type==="genres_list") url = `https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/discover/movie?with_genres=${prop.movieList}&language=en-US`;
      else if(prop.type==="collection") url = `https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/collection/${prop.movieList}?language=en-US`;
      console.log(url);
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
            if(pickFromlist.length<1) setPickFromlist(randomNumber(prop.pick===undefined?(response.results.length):prop.pick,0,response.results.length-1));
            setMovieList(response);
          }
        })
        .catch(err => console.error(err));
    }
    fetchData();
},[pickFromlist,prop.pick,prop.page, prop.movieList, prop.query,prop.type,page]);
  if(movieList==="") return(<CircularProgress />);
  else if(movieList==="empty") return null;
  else {
    return(
      <>
        <Container fixed
        sx={prop.fullScreen===true?{width: mobile?"90vw":"100vw", display: "flex", flexDirection: "column", alignItems:"center"}:{width: "100%", height: 520, display: "flex"}}>
          {
            <>
              <ImageList sx={prop.fullScreen===true?{ width: "100%", display: "flex", justifyContent:"center",flexWrap:"wrap" }:{ width: "100%", maxHeight: 480 , display: "flex", flexDirection: mobile?"column":"row"}}>
              {
                movieList.results.map((item,index) => 
                  pickFromlist.includes(index) && (prop.genres===undefined || prop.genres===0 || item.genre_ids.some(genre => genre == prop.genres))?
                  (
                    <ImageListItem key={item.id}  >
                      <Link to={`/movies/${item.id}`}>
                        <Image
                          style={{maxHeight: 450, minWidth: 300}}
                          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`}
                          alt={item.title}
                        />
                      </Link>
                      <ImageListItemBar
                        title={item.title}
                        subtitle={item.release_date}
                        actionIcon={
                          <>
                            {item.adult?
                              <IconButton>
                                <ExplicitIcon/>
                              </IconButton>
                              :null}
                            <AddToFavorite id={item.id} />
                          </>
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
            </>
          }
        </Container>
      </>
    );
  }
}