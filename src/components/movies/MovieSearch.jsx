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

import Image from '../Imgage';

import { ContextStatus } from '../../App';
//========
export default function MovieSearch(prop) {//prop: movieList, page
  // const [movieList,setMovieList] = useState("");
  const [fetchedMovieList,setFetchedMovieList] = useState("");
  const { serviceInfo, mobile } = useContext(ContextStatus);
  const [ page, setPage] = useState(1);
  const [ searching, setSearching] = useState(false);
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(()=>{
    let fetchPage = 0;
    let fetchedData = [];
    function fetchData () {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${serviceInfo.token}`,
        }
      };
      fetchPage++;
      let url = `https://api.themoviedb.org/3/search/movie?query=${prop.query}&page=${fetchPage}&include_adult=true`;
      fetch(url, options)
        .then(response => response.json())
        .then(response => {
          if (response.success!==false) {
            fetchedData=fetchedData.concat(response.results);
          }
          if (fetchPage<response.total_pages){
            fetchData();
          }
          else {
            setFetchedMovieList(fetchedData);
            setSearching(false);
          }
        })
        .catch(err => {
          setFetchedMovieList(fetchedData);
          setSearching(false);
          console.error(err);
        });
    }
    setSearching(true);
    fetchData();
},[setSearching,serviceInfo,prop.query]);
  if(fetchedMovieList==="" || searching) return(<CircularProgress />);
  else if(fetchedMovieList.length===0) return null;
  else {
    const filteredMovieList = fetchedMovieList.filter(movie => prop.genre==0 || movie.genre_ids.some(genre => genre == prop.genre));
    // console.log(filteredMovieList);
    const totalPage = Math.ceil(filteredMovieList.length/20);
    return(
      <>
        <Container fixed
        sx={prop.fullScreen===true?{width: mobile?"80vw":"100vw", display: "flex", flexDirection: "column", alignItems:"center"}:{width: "100%", height: 520, display: "flex"}}>
          {
            <>
              <ImageList sx={prop.fullScreen===true?{ width: "100%", display: "flex", justifyContent:"center",flexWrap:"wrap" }:{ width: "100%", maxHeight: 480 , display: "flex", flexDirection: mobile?"column":"row"}}>
              {
                filteredMovieList.map((item,index) => index>page*20 || index<(page-1)*20? null:
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
              )}
              </ImageList>
                {totalPage<2?null:<Pagination count={totalPage} boundaryCount={mobile?0:2} page={page}  onChange={handleChange} />}
            </>
          }
        </Container>
      </>
    );
  }
}