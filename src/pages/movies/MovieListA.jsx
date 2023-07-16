import { useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


import Pagination from '@mui/material/Pagination';
// import Paper from '@mui/material/Paper';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import { ContextStatus } from '../../App';

// import AddToCartButton from '../../components/movies/AddToCartButton';
// import Stars from '../../components/small-component/Stars';
// import Price from '../../components/movies/Price';


//========
//Group this setting to a config file later
const NUMBER_PRODUCT_PER_PAGE = 12;
//========
export default function MovieList() {
  const { showMovieList, inCart} = useContext(ContextStatus);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const { movieId } = useParams();
  console.log((inCart))
  if(movieId===undefined)  {
    return(
      <>
        <ImageList sx={{ width: 500, height: 450 }}>
          <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="div">December</ListSubheader>
          </ImageListItem>
          {showMovieList.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.title}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Pagination count={Math.ceil(showMovieList.length / NUMBER_PRODUCT_PER_PAGE)} color="primary"  style={{ margin: "20px" }} page={page}  onChange={handleChange} />
      </>
    );
  }
}