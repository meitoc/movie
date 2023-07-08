import axios from "axios";
import { useEffect,useContext} from "react";
import { ContextStatus } from "../../App";
// import { createBrowserHistory } from "history";
import LoginForm from "../../modules/LoginForm";

export function AuthenCheck(prop) {
    // const history=createBrowserHistory();
    const { loginStatus, setLoginStatus} = useContext(ContextStatus);
    // const [login,setLogin] =useState(null);
    useEffect(()=>{
        async function checkSession() {
            const session = localStorage.getItem('loginSession');
            console.log(session);
            axios({
                method: 'get',
                baseURL: 'https://fakeapi.meitoc.net',
                url: `/api/checktoken?token=${session}`,
            }).then(response => {
                const data =  response.data;
                console.log(data);
                if(data.status==="newtoken"){
                    localStorage.setItem('loginSession',data.data.token);
                    setLoginStatus(true);
                    // setLoginStatus(true);
                } else if(data.status==="loggedin"){
                    setLoginStatus(true);
                    // setLoginStatus(true);
                } 
                else {
                    setLoginStatus(false);
                    // setLoginStatus(false);
                }
            })
            .catch(error => {
                console.log(error)
                // setLogin(false);
                // setLoginStatus(false);
            }); 
        }
        checkSession();
    },[setLoginStatus]);
        if(loginStatus===true){
            return(<>
                {prop.children}
            </>)
        }
        else if(loginStatus===false){
            return (<LoginForm />);
        }
        else return null;
}