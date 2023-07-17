import { useEffect,useContext} from "react";
import { ContextStatus } from "../../App";

export default function FetchUserData(prop) {
    const { loginStatus, userData, setUserData,serviceInfo} = useContext(ContextStatus);
    // const [changeData,setChangData] =useState(null);
    useEffect(()=>{
        async function fetchData() {
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: `Bearer ${serviceInfo.token}`,
                }
              };
              
              fetch(`https://api.themoviedb.org/3/account/${serviceInfo.account}`, options)
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
        
        if(loginStatus===true && userData === null) {
            fetchData();
            console.log("Fetching user data from TMDB")
        }
    },[userData,setUserData,serviceInfo,loginStatus]);
    if(userData !== ""){
        return(<>
            {prop.children}
        </>)
    }
    else {
        return null;
    }
}