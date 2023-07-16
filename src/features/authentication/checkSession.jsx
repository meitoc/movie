import axios from "axios";
import { useEffect,useContext} from "react";
import { ContextStatus } from "../../App";
// import { createBrowserHistory } from "history";
export default function CheckSession (prop) {
    // const history=createBrowserHistory();
    const { setLoginStatus, setServiceInfo} = useContext(ContextStatus);
    // const [login,setLogin] =useState(null);
    useEffect(()=>{
        async function checkLoginSession() {
            const session = localStorage.getItem('loginSession');
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
                    console.log("Fakeapi.meitoc.net created a newtoken");
                    setServiceInfo(themoviedb);
                    // setLoginStatus(true);
                } else if(data.status==="loggedin"){
                    setLoginStatus(true);
                    const themoviedb = data.data.services.find(item => item.service === "themoviedb");//load login info for layer 2
                    console.log("Fakeapi.meitoc.net created a loggedin token");
                    setServiceInfo(themoviedb);
                } 
                else {
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
        checkLoginSession();
    },[setLoginStatus,setServiceInfo]);
  return(<>
      {prop.children}
  </>);
}