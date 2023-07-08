import { AuthenCheck } from "../features/authentication/AuthenCheck"
// chang this function later for security

export default function Account() {
    // const {loginStatus} = useContext(ContextStatus);
    return (
    <AuthenCheck>
        <p>Name: ABC</p>
        <p>Level: Gold</p>
        <p>Coint: $1.000.000</p>
    </AuthenCheck>
    )
}