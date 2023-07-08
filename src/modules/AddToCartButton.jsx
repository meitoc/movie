import { useContext } from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';

import { ContextStatus } from '../App';
import LoginForm from './LoginForm';

export default function AddToCartButton(prop) {
    const {setTotalInCart, inCart, setInCart, loginStatus, reload, setReload} = useContext(ContextStatus);
    const [showLoginForm, setShowLoginForm] = useState(false);
    function addToCart(id) {
        let newInCart=inCart;
        const index = newInCart.findIndex((item) => item.id === id);
        if (index !== -1) {
            newInCart[index].quantity++;
        } else {
            newInCart.push({ id, quantity: 1 });
        }
        setTotalInCart(newInCart.length);
        setInCart(newInCart)
    }
    // const changeState(input) => setShowLoginForm(input)
    return(
        <>
            {showLoginForm?(<LoginForm goBack={false} display={true} fn={(input)=>setShowLoginForm(input)} />):""}
            <Button
            variant="contained"
            size="big"
            // sx={{backgroundColor:'rgb(255,255,255)', color:'rgb(50,50,100)'}}
            onClick={()=>{
                if(loginStatus) {
                    addToCart(prop.id);
                    setReload(!reload);
                }
                else {
                    setShowLoginForm(true);
                }
            }}
            >
                Add to cart
            </Button>
        </>
    )
}