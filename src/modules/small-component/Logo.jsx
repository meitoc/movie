import { Link } from 'react-router-dom';
export function Logo () {
    return(
        <Link to={"/"}>
            <img
            style={{margin: "5px"}}
            width="40px"
            height="40px"
                src={"https://fakeapi.meitoc.net/api/logo.svg"}>
            </img>
        </Link>
    )
}