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
            height="30px"
                src={
                    mobile?
                    "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                    :"https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"}>
            </img>
        </Link>
    )
}