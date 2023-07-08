import { useContext, useEffect} from "react";
import { ContextStatus } from "../../App";

export default function FilterProduct(prop) {
    const { productList, showProductList, setShowProductList, sortBy, selectCategory, searchInput} = useContext(ContextStatus);
    useEffect(()=>{
        console.log("searchInput");
        console.log(searchInput);
        let sortedProducts;
            sortedProducts = productList.filter(item => {
                const searchInputLowerCase = searchInput.toLowerCase()
                return (
                    item.category.toLowerCase().includes(searchInputLowerCase) ||
                    item.name.toLowerCase().includes(searchInputLowerCase) ||
                    item.gender.toLowerCase().includes(searchInputLowerCase) ||
                    item.description.toLowerCase().includes(searchInputLowerCase)
                );
            });
        //=======pass through Category
        if(selectCategory!==""){
            sortedProducts = sortedProducts.filter(item => {
                const selectLowerCase = selectCategory.toLowerCase()
                return (
                    item.category.toLowerCase().includes(selectLowerCase)
                )})
        }
        switch(sortBy){
            case "priceup": sortedProducts.sort((a, b) => a.price - b.price); break;
            case "pricedown": sortedProducts.sort((a, b) => b.price - a.price); break;
            case "rateup": sortedProducts.sort((a, b) => a.totalRating - b.totalRating); break;
            case "ratedown": sortedProducts.sort((a, b) => b.totalRating - a.totalRating); break;
            default: sortedProducts.sort((a, b) => b.totalReview - a.totalReview); break;
            // default: sortedProducts = sortedProducts; break;
        } 
        setShowProductList(sortedProducts);
    },[productList, setShowProductList, sortBy,searchInput,selectCategory]);
    console.log("showProductList");
        console.log(showProductList);
    if(showProductList===null){
        return (<p>Processing data...</p>);
    } else if(showProductList.length===0){
        return (<p>No product be matched!</p>);
    } else{ 
        return(<>
            {prop.children}
        </>)
    }
}