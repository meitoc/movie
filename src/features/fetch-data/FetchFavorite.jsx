import { useEffect,useContext} from "react";
import { ContextStatus } from "../../App";

export default function FetchFavorite(prop) {
    const { loginStatus, setFavoriteData} = useContext(ContextStatus);
    useEffect(()=>{
        async function fetchData() {
            const options = {
                method: 'GET',
                headers: {
                accept: 'application/json',
                Authorization: `Bearer ${session}`,
                }
            };
            fetch(`https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/account/favorite/movies/id`, options)
                .then(response => response.json())
                .then(response => {
                    console.log("Favorite List id:")
                    console.log(response);
                    if(Array.isArray(response.data)) setFavoriteData(response.data);
                    else setFavoriteData([]);
                    console.log("Fetched your favorite list.");
                })
                .catch(err => {
                    setFavoriteData([]);
                    console.log("Error when fetch favorite list!")
                    console.error(err);
                });
        }
        let session = localStorage.getItem('loginSession');
        if(loginStatus===true && session!=null && session!==undefined) {
            fetchData(session);
            setFavoriteData(""); //prevent reloading this component
            console.log(`Fetching favorite list...`);
        }
    },[setFavoriteData,loginStatus]);
    return(<>
        {prop.children}
    </>);
}