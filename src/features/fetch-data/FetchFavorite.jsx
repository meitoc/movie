import { useEffect,useContext} from "react";
import { ContextStatus } from "../../App";

export default function FetchFavorite(prop) {
    const { loginStatus, setFavoriteData,serviceInfo} = useContext(ContextStatus);
    useEffect(()=>{
        let page=0;
        let results=[];
        async function fetchData() {
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: `Bearer ${serviceInfo.token}`,
                }
              };
              page++;
              fetch(`https://api.themoviedb.org/3/account/${serviceInfo.account}/favorite/movies?page=${page}`, options)
                .then(response => response.json())
                .then(response => {
                    if(page < response.total_pages) {
                        results=results.concat(response.results);
                        fetchData();
                    }
                    else {
                        setFavoriteData(results.concat(response.results));
                        console.log("Fetched your favorite list.");
                    }
                })
                .catch(err => {
                    console.log("Error when fetch favorite list!")
                    console.error(err);
                });
        }
        if(serviceInfo.account!==null) fetchData();
        console.log(`Fetching favorite list...`);
    },[setFavoriteData,serviceInfo]);
    if(loginStatus===true){
        return(<>
            {prop.children}
        </>)
    }
    else {
        return null;
    }
}