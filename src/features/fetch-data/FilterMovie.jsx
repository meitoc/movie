import { useContext, useEffect} from "react";
import { ContextStatus } from "../../App";

export default function FilterMovie(prop) {
    const { movieList, showMovieList, setShowMovieList, sortBy, selectCategory, searchInput} = useContext(ContextStatus);
    useEffect(()=>{
        console.log(`Searching: ${searchInput}`);
        let sortedMovies;
            sortedMovies = movieList.filter(item => {
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
            sortedMovies = sortedMovies.filter(item => {
                const selectLowerCase = selectCategory.toLowerCase()
                return (
                    item.category.toLowerCase().includes(selectLowerCase)
                )})
        }
        switch(sortBy){
            case "priceup": sortedMovies.sort((a, b) => a.price - b.price); break;
            case "pricedown": sortedMovies.sort((a, b) => b.price - a.price); break;
            case "rateup": sortedMovies.sort((a, b) => a.totalRating - b.totalRating); break;
            case "ratedown": sortedMovies.sort((a, b) => b.totalRating - a.totalRating); break;
            default: sortedMovies.sort((a, b) => b.totalReview - a.totalReview); break;
        } 
        setShowMovieList(sortedMovies);
    },[movieList, setShowMovieList, sortBy,searchInput,selectCategory]);
    console.log("showMovieList");
        console.log(showMovieList);
    if(showMovieList===null){
        return (null);
    } else if(showMovieList.length===0){
        return (null);
    } else{ 
        return(<>
            {prop.children}
        </>)
    }
}