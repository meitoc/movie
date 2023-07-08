import { useContext } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';


import { ContextStatus } from '../../App';
import AddToCartButton from '../../modules/AddToCartButton';
import ImageBox from '../../modules/products/ImageBox';
import Comments from '../../modules/products/Comments';
import Stars from '../../modules/small-component/Stars';
import Price from '../../modules/shared/Price';

export default function ProductDetail(data) {
  const {darkMode,inCart}=useContext(ContextStatus);
  const product=data.product;
  // if(loginStatus!==true) setLoginFormOpen(true);//check login
  const itemInCart = inCart.find(e=>e.id===product.id);
  const quantityItem = (itemInCart!==undefined)? itemInCart.quantity:0;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 1, sm: 2, md: 2 }} >
        <Grid item xs={1} sm={2} md={2} >
            <Card sx={{ backgroundColor: darkMode ? 'rgb(10,100,100)' : 'rgb(210,210,255)'}}>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {product.name}
                </Typography>
                <ImageBox images={product.images} />
              </CardContent>
              <CardActions sx={{display:"flex", justifyContent:"space-between"}}>
                <AddToCartButton id={product.id} />
                {quantityItem>0? `x ${quantityItem}`:""}
                <Price price={product.price} priceSale={product.priceSale} />
              </CardActions>
            </Card>
        </Grid>
        <Grid item xs={2} sm={4} md={4} >
            <Card sx={{padding:"10px", backgroundColor: darkMode ? 'rgb(10,100,100)' : 'rgb(210,210,255)'}}>
              <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: product.description}} />
              {product.tags.map(e=><Chip label={e} key={e} />)}
            </Card>
        </Grid>
        <Grid item xs={2} sm={4} md={4} >
          <Card sx={{ backgroundColor: darkMode ? 'rgb(10,100,100)' : 'rgb(210,210,255)'}}>
            <CardContent>
              Rating:<Stars stars={product.totalRating} />
              <Comments reviews={product.reviews} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}