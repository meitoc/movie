import { useContext} from "react";
import { ContextStatus } from "../../App";
import LoginForm from "../../components/form/LoginForm";
import CheckUserSession from "./CheckUserSession";
import LetLogin from "../../components/movies/LetLogin";
export function AuthenCheck(prop) {
    const { loginStatus} = useContext(ContextStatus);
    return(
        <CheckUserSession>
            {loginStatus===true?
                prop.children 
                : (
                    loginStatus===false ?
                        (prop.loginForm!==false?
                            <LoginForm />
                            : <LetLogin />
                        )
                        : null
                )
            }
        </CheckUserSession>);
}