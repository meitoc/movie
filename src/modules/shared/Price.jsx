 export default function Price(prop)   {
    const price = prop.price;
    const priceSale = prop.priceSale;
    return (<div>
    ${price<priceSale || priceSale==null?price:(<>{priceSale} <span style={{textDecoration:"line-through", marginLeft:"5px"}}>${price}</span></>)}
    </div>)
}