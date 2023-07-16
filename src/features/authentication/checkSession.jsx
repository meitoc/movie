import { useEffect,useContext} from "react";
import { ContextStatus } from "../../App";
import axios from "axios";

export default function CheckSession (prop) {
    const { setLoginStatus, setServiceInfo} = useContext(ContextStatus);
    useEffect(()=>{
        function checkLoginSession() {
            
            axios({
                method: 'get',
                baseURL: 'https://fakeapi.meitoc.net',
                url: `/api/checktoken?token=${session}`,
            }).then(response => {
                const data =  response.data;
                if(data.status==="newtoken"){
                    localStorage.setItem('loginSession',data.data.token);
                    setLoginStatus(true);
                    //
                    const themoviedb = data.data.services.find(item => item.service === "themoviedb");//load login info for layer 2
                    console.log("Website created a newtoken");
                    setServiceInfo(themoviedb);
                    // setLoginStatus(true);
                } else if(data.status==="loggedin"){
                    setLoginStatus(true);
                    const themoviedb = data.data.services.find(item => item.service === "themoviedb");//load login info for layer 2
                    console.log("Website created a loggedin token");
                    setServiceInfo(themoviedb);
                } else {
                    setLoginStatus(false);
                    // setLoginStatus(false);
                }
            })
            .catch(error => {
                console.log("Error when check your session!")
                console.log(error)
                // setLogin(false);
                // setLoginStatus(false);
            }); 
        }
        let session = localStorage.getItem('loginSession');
        if (session !==null & session!==undefined) checkLoginSession();
        else setLoginStatus(false);
    },[setLoginStatus,setServiceInfo]);
    if(prop.children!=null) return(
        <>
        {prop.children}
        </>
    ); else return null;
}