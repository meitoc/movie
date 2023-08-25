import { useContext, useEffect} from "react";
import { ContextStatus } from "../../App";
// import LoginForm from "../../components/form/LoginForm";
import CheckUserSession from "./CheckUserSession";
// import LetLogin from "../../components/movies/LetLogin";
export function AuthenCheck(prop) {
    const { loginStatus, setShowLoginForm} = useContext(ContextStatus);
    useEffect(()=>{
        if(loginStatus===true) setShowLoginForm(false);
        else if(loginStatus===false) setShowLoginForm(true);
    },[loginStatus,setShowLoginForm])
    return(
        <CheckUserSession>
            {loginStatus===true?
                prop.children 
                : null
            }
        </CheckUserSession>);
}
