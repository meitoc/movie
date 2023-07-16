import { AuthenCheck } from "../features/authentication/AuthenCheck"
import { useContext } from "react"
import FetchUserData from "../features/fetch-data/FetchUserData"
import { ContextStatus } from "../App";
import Avatar from '@mui/material/Avatar';
// chang this function later for security
export default function Account() {
    const {userData,loginStatus} = useContext(ContextStatus);
    console.log(userData);
    return (
    <AuthenCheck>
        <FetchUserData>
            {
                (userData!=="" && loginStatus)?
                (
                <>
                    <Avatar alt={userData.name} src={`https://www.themoviedb.org/t/p/w150_and_h150_face${userData.avatar.tmdb.avatar_path}`} />
                    <p>Usename: {userData.username}</p>
                    <p>ID: {userData.id}</p>
                    <p>Name: {userData.name}</p>
                </>
                )
                :
                ""
            }
        </FetchUserData>
    </AuthenCheck>
    );
}