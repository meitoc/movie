import { useContext} from "react";
import { ContextStatus } from "../../App";
import LoginForm from "../../components/form/LoginForm";
// import CheckSession from "./CheckSession"
export function AuthenCheck(prop) {
    const { loginStatus} = useContext(ContextStatus);
    return(
        <>
            {loginStatus===true? prop.children : ( loginStatus===false ? (<LoginForm />) : "")}
        </>);
}