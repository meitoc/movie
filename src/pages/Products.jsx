import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';

import { ContextStatus } from '../App';
import ProductDetail from './products/ProductDetail';
import ProductList from './products/ProductList';
import SortForm from '../modules/filter/SortForm';
import CategorySelect from '../modules/filter/CategorySelect';
import FetchProductList from '../features/fetch-data/FetchProductList';
import FilterProduct from '../features/fetch-data/FilterProduct';

export default function Listproducts() {
  const { productList} = useContext(ContextStatus);
  const { productId } = useParams();
  if(productId===undefined)  {
    return(
      <FetchProductList>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div  style={{display: "flex", flexDirection: "row", flexWrap: "nowrap", width: "100%"}}>
            <CategorySelect />
            <SortForm />
          </div>
          <FilterProduct>
            <ProductList />
        </FilterProduct>
        </Box>
      </FetchProductList>
    );
  }
  const viewProduct = productList.find((e) => e.id === productId);
  return(
    <FetchProductList>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>    
        {viewProduct===undefined?
        <p>...</p>
        :
        <ProductDetail product={viewProduct} />
        }  
      </Box>
    </FetchProductList>
  );
}