import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';


import { ContextStatus } from '../../App';

import AddToCartButton from '../../modules/AddToCartButton';
import Stars from '../../modules/small-component/Stars';
import Price from '../../modules/shared/Price';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgb(10,100,100)' : 'rgb(210,210,255)',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  elevation: 3,
}));
//========
//Group this setting to a config file later
const NUMBER_PRODUCT_PER_PAGE = 12;
//========
export default function ProductList() {
  const { showProductList, inCart} = useContext(ContextStatus);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const { productId } = useParams();
  console.log("AAB")
  console.log((productId))
  if(productId===undefined)  {
    return(
      <>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }} >
            {showProductList.map((product, index) =>{ 
              let itemInCart = inCart.find(e=>e.id===product.id);
              let quantityItem = (itemInCart!==undefined)? itemInCart.quantity:0;
              return(
              index>=((page-1)*5) && index<(page*NUMBER_PRODUCT_PER_PAGE)?(
                <Grid item xs={2} sm={4} md={4} key={index} >
                  <Item>
                    <Typography variant="h6" component="div">{product.name}</Typography>
                    <Link to={`products/${product.id}`} style={{textDecoration: "none"}}>
                        <Img alt="complex" src={product.cover} />
                    </Link>
                    <div>
                      <Price price={product.price} priceSale={product.priceSale} />
                      {quantityItem>0? `x ${quantityItem}`:""}
                    </div>
                    <Stars stars={product.totalRating} />
                    <CardActions>
                      <AddToCartButton id={product.id} />
                    </CardActions>
                  </Item>
                </Grid>
              )
              :
              ""
            )})}
          </Grid>
        </Box>
        <Pagination count={Math.ceil(showProductList.length / NUMBER_PRODUCT_PER_PAGE)} color="primary"  style={{ margin: "20px" }} page={page}  onChange={handleChange} />
      </>
    );
  }
}