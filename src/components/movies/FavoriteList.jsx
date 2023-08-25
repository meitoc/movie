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

// import randomNumber from '../../features/randomNumber';
import Image from '../Imgage';

import { ContextStatus } from '../../App';
//========
export default function FavoriteList(prop) {//prop: movieList, page
    const [movieList,setMovieList] = useState("");
    const { favoriteData, mobile } = useContext(ContextStatus);
    // const [pickFromlist, setPickFromlist] = useState([]);
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };
    useEffect(()=>{
        let movieDetailList=[];
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
            }
        };
        console.log(`Fetching the movie list`);
        let favoriteLength=favoriteData.length;
        const fetchData = (i)=>{
            if(i<favoriteLength){
                console.log( `https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/movie/${favoriteData[i].id}?language=en-US`)
                fetch( `https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/movie/${favoriteData[i].id}?language=en-US`, options)
                    .then(response => response.json())
                    .then(response => {
                        if (response.id!==undefined && response.id!=null) movieDetailList.push(response);
                        fetchData(i+1);
                    }
                ).catch(err => {
                    fetchData(i+1);
                    console.log("Error when fetch a specific movie")
                    console.error(err);    
                });
            }
            else {
                if (movieDetailList.length>0){
                    setMovieList(movieDetailList);
                }
                else{
                    setMovieList("empty");
                }
            }
        };
        if(Array.isArray(favoriteData) && favoriteData.length>0) fetchData(0);
    },[favoriteData]);
    if(favoriteData==="" || (Array.isArray(favoriteData) && favoriteData.length>0 && movieList==="")) return(<CircularProgress />);
    else if((Array.isArray(favoriteData) && favoriteData.length===0) || movieList==="empty") return (<h1>Go to home page and click ❤ on your favorite movies!</h1>);
    else {
        return(
        <>
            <Container fixed
            sx={prop.fullScreen===true?{width: mobile?"90vw":"100vw", display: "flex", flexDirection: "column", alignItems:"center"}:{width: "100%", height: 520, display: "flex"}}>
            {
                <>
                <ImageList sx={prop.fullScreen===true?{ width: "100%", display: "flex", justifyContent:"center",flexWrap:"wrap" }:{ width: "100%", maxHeight: 480 , display: "flex", flexDirection: mobile?"column":"row"}}>
                {
                    movieList.map((item) => 
                    (
                        <ImageListItem key={item.id}  >
                        <Link to={`/movies/${item.id}`}>
                            <Image
                            style={{maxHeight: 420, minWidth: 300}}
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