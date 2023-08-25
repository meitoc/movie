import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ContextStatus } from '../../App';
export function Logo () {
    const {mobile} = useContext(ContextStatus)
    return(
        <Link to={"/"}>
            <img
            style={{margin: "5px"}}
            // width="40px"
            height={mobile?"40px":"50px"}
                src={
                    mobile?
                    "/logo.svg"
                    :"/long-logo.svg"}>
            </img>
        </Link>
    )
}