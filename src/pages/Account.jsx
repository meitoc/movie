import { AuthenCheck } from "../features/authentication/AuthenCheck";
import { useContext } from "react";
import { ContextStatus } from "../App";
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AccountInformation from "../components/account/AccountInformation";
import UserInformation from "../components/account/UserInformation";
import PasswordChange from "../components/account/PasswordChange";
// import Avatar from '@mui/material/Avatar';
// chang this function later for security

export default function Account() {
    const {userData} = useContext(ContextStatus);
    console.log('userData');
    console.log(userData);
    return  (
    <AuthenCheck>
            {
                (userData!==null)?
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                        m: 1,
                        width: '90vw',
                        padding: 2
                        },
                    }}
                >
                    <Paper elevation={2}>
                        <AccountInformation/>
                    </Paper>
                    <Paper elevation={2}>
                        <PasswordChange/>
                    </Paper>
                    <Paper elevation={2} >
                        <UserInformation/>
                    </Paper>
                </Box>
                :
                <CircularProgress />
            }
    </AuthenCheck>
    );
}