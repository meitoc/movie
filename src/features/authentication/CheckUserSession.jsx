import { useEffect,useContext} from "react";
import { ContextStatus } from "../../App";

export default function CheckUserSession (prop) {
    const { setLoginStatus} = useContext(ContextStatus);
    useEffect(()=>{
    const checkLoginSession = async () => {
        const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            },
        };
        console.log("Session check:")
        console.log(`https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/authentication/token/check?token=${session}`);
        fetch(`https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/authentication/token/check?token=${session}`, options)
        .then(response => response.json())
        .then(response => {
        console.log(response);
        if(response.status===true){
            console.log("Session checked");
            setLoginStatus(true);
        } else{
            setLoginStatus(false);
        }
        })
        .catch(error => {
            console.log(error)
            console.log("Movie.meitoc.net: Check your internet connection!");
            })
        }    
        let session = localStorage.getItem('loginSession');
        console.log(session);
        if (session !==null && session!==undefined) checkLoginSession();
        else 
            setLoginStatus(false);
    },[setLoginStatus]);
    return(
        <>
        {prop.children}
        </>
    );
}