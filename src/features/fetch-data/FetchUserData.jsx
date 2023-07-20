import { useEffect,useContext} from "react";
import { ContextStatus } from "../../App";

export default function FetchUserData(prop) {
    const {  setUserData} = useContext(ContextStatus);
    // const [changeData,setChangData] =useState(null);
    useEffect(()=>{
        async function fetchData() {
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzE3Y2M2ZmJhOGVlM2JlZGU3ZWM5Y2ExMzliYTY2MyIsInN1YiI6IjY0YWI1ZjRhM2UyZWM4MDE0ZjQ4Yzc0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cRiZKRKz69frrd76S78hn4cvRpZDPA8XNfxm5HjwWBA`,
                }
              };
              
              fetch(`https://api.themoviedb.org/3/account/20129309`, options)
                .then(response => response.json())
                .then(response => {
                    setUserData(response);
                    console.log("Fetched your TMDB account info.")
                })
                .catch(err => {
                    console.log("Error when fetch TMDB account info!")
                    console.error(err);
                });
        }
        
        // if(loginStatus===true && userData === null) {
            fetchData();
            console.log("Fetching user data from TMDB")
        // }
    },[setUserData]);
        return(<>
            {prop.children}
        </>)
}