import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { ContextStatus } from "../App";
import { AuthenCheck } from "../features/authentication/AuthenCheck";
import FetchProductList from "../features/fetch-data/FetchProductList";

import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export function Cart() {
    const {inCart,setInCart,productList,setTotalInCart, reload, setReload} = useContext(ContextStatus);
    const [checked, setChecked] = useState(inCart.map((e,i)=>(i)));
    //Later, delete the line below to use useReducer íntead
   
    console.log(checked);
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };
    function handleToggleAll(){
        if(checked.length===inCart.length){
            setChecked([]);
        }
        else {
            setChecked(inCart.map((e,i)=>(i)));
        }
    }
    function removeProduct(value){
        let newInCart = inCart;
        newInCart.splice(value,1);
        // console.log(newInCart)
        setInCart(newInCart);
        setTotalInCart(newInCart.length);
        setChecked(checked.filter(item => item !== value));
    }
    function decreateProduct(value) {
        if(inCart[value].quantity===1) removeProduct(value);
        else{
            let newInCart = inCart;
            newInCart[value].quantity --;
            console.log(newInCart)
            setInCart(newInCart);
            setReload(!reload);
        }
    }
    function increateProduct(value) {
        //later, check condition if quantity more than the maximum quantity which is available to order
        let newInCart = inCart;
            newInCart[value].quantity ++;
            console.log(newInCart)
            setInCart(newInCart);
            setReload(!reload);
    }
    let totalMustToPay=0;
    return (
        <AuthenCheck>
            <FetchProductList>
                {
                inCart.length===0?
                    <>
                    <h2>Look like empty cart...</h2>
                        <Link to={"/"}>
                            <Button variant="contained" disableElevation>
                            Go shopping!
                            </Button>
                        </Link>
                    </>
                :
                    <Paper
                    sx={{
                        p: 2,
                        margin: 'auto',
                        // maxWidth: 500,
                        flexGrow: 1,
                        backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    }}
                    >
                        
                            {inCart.map((value,index) => {
                                const labelId = `checkbox-list-secondary-label-${index}`;
                                const product = productList.find((e)=>e.id===value.id);
                                totalMustToPay += ((checked.indexOf(index) !== -1)? (product.price * inCart[index].quantity):0);
                                return (
                                    <>
                                    <Grid container  key={value}sx={{margin: 1, padding: 1}} >
                                        <Checkbox
                                            edge="end"
                                            onChange={handleToggle(index)}
                                            checked={checked.indexOf(index) !== -1}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                            sx={{margin:1}}
                                        />
                                        <Link to={`/products/${product.id}`} >
                                            <Grid item>
                                                <ButtonBase sx={{ margin: 2, width: 128, height: 128 }}>
                                                    <Img alt="complex" src={product.cover} />
                                                </ButtonBase>
                                            </Grid>
                                        </Link>
                                        <Grid item xs={12} md container>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="subtitle1" component="div">
                                                        {product.name}
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                                            <InputLabel id={`select-size${index}`}>Size</InputLabel>
                                                            <Select
                                                                labelId="demo-select-small-label"
                                                                id="demo-select-small"
                                                                // value={size}
                                                                label="Size"
                                                                // onChange={handleChange}
                                                            >
                                                                <MenuItem value="">
                                                                <em>None</em>
                                                                </MenuItem>
                                                                {product.sizes.map((e,i)=>(
                                                                    <MenuItem key={`${index}chose${i}`} value={e}>{e}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        ID: {product.code}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                                        <Button onClick={()=>removeProduct(index)}>Remove</Button>
                                                        <Button onClick={()=>decreateProduct(index)}>-</Button>
                                                        <Button onClick={()=>increateProduct(index)}>+</Button>
                                                        
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle1" component="div">
                                                ${product.price}<br></br>x {inCart[index].quantity}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        
                                    </Grid>
                                    <Divider/>
                                    </>
                                );
                            })}

                            <Grid container direction="row" sx={{margin: 1, padding: 1, display:"flex", justifyContent:"space-between"}} >
                                <Checkbox
                                    edge="end"
                                    onChange={handleToggleAll}
                                    checked={checked.length===inCart.length}
                                    sx={{margin:1}}
                                />
                                <Grid item sx={{margin:1}}>Total: ${totalMustToPay.toFixed(2)}
                                </Grid>
                                <Grid item sx={{margin:1}} container>
                                    <Button variant="contained">Pay</Button>
                                </Grid>
                            </Grid>
                    </Paper>
                }
            </FetchProductList>
        </AuthenCheck>
    );
}
