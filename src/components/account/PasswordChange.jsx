import { useState} from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import ChangeAccountInfo from "../info-change/ChangeAccountInfo";

import addUserData from "../../features/fetch-data/addUserData";
import SubmitOTP from "./SubmitOTP";

const styleShow={display: 'flex', flexDirection: 'column', alignItems: 'center'};
const styleHide={display: 'none'};

export default function PasswordChange() {
    // const [oldPassword,setOldPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [repeatPassword,setRepeatPassword]=useState("");
    // const [showOldPassword,setShowOldPassword]=useState(false);
    const [showNewPassword,setShowNewPassword]=useState(false);
    const [showRepeatPassword,setShowRepeatPassword]=useState(false);

    const [doneSubmit, setDoneSubmit] = useState(undefined);
    const [openModal, setOpenModal] = useState(false);
    const [sessionOTP, setSessionOTP] = useState("");

    const handleSubmit = () => {
        setOpenModal(true);
        const password=JSON.stringify({/*oldPassword,*/newPassword,repeatPassword});
        async function checkResults() {
            try {
                const result = await addUserData("password", password);
                if (result.status !== true) {
                    setDoneSubmit(false);
                } else {
                    setSessionOTP(result.waiting_key)
                    setDoneSubmit(true);
                }
            } catch (error) {
              console.error(error);
              setDoneSubmit(false);
            }
          }
          if(/*oldPassword!="" && newPassword!=="" && oldPassword!==newPassword &&*/ newPassword===repeatPassword){
            checkResults();
          }else{
            setDoneSubmit(false);
          }
      
    };
    return  (
        <>
            <Typography variant="h5" gutterBottom>
                Password
            </Typography>
            <ChangeAccountInfo 
                buttonName="Change"
                title="Change password"
                note={doneSubmit===true?"":"After click submit, we will send you an OTP code."} 
                open = {openModal===true} 
            >
                <div style={doneSubmit!==true?styleShow:styleHide}>
                    {/* <FormControl sx={{margin:2, width:270}} variant="outlined" disabled={doneSubmit===""} >
                        <InputLabel htmlFor="outlined-old-password">Old Password</InputLabel>
                        <OutlinedInput
                            id="outlined-old-password"
                            type={showOldPassword ? 'text' : 'password'}
                            autoComplete="old-password"
                            value={oldPassword}
                            onChange={event=>setOldPassword(event.target.value)}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={()=>setShowOldPassword(!showOldPassword)}
                                    edge="end"
                                >
                                {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Old Password"
                        />
                    </FormControl> */}
                    <FormControl sx={{margin:2, width:270}} variant="outlined" disabled={doneSubmit===""} >
                        <InputLabel htmlFor="outlined-new-password">New Password</InputLabel>
                        <OutlinedInput
                            id="outlined-new-password"
                            type={showNewPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            value={newPassword}
                            onChange={event=>setNewPassword(event.target.value)}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={()=>setShowNewPassword(!showNewPassword)}
                                    edge="end"
                                >
                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="New-Password"
                        />
                    </FormControl>
                    <FormControl sx={{margin:2, width:270}} variant="outlined" disabled={doneSubmit===""} >
                        <InputLabel htmlFor="outlined-repeat-password">Repeat New Password</InputLabel>
                        <OutlinedInput
                            id="outlined-repeat-password"
                            type={showRepeatPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            value={repeatPassword}
                            onChange={event=>setRepeatPassword(event.target.value)}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={()=>setShowRepeatPassword(!showRepeatPassword)}
                                    edge="end"
                                >
                                {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Repeat-New-Password"
                        />
                    </FormControl>
                    <Typography sx={{display:(doneSubmit===false?"block":"none"),margin:2, width:270}} variant="caption" gutterBottom>
                        Sorry! Something went be wrong. Try again or wait a minute.
                    </Typography>
                    <Button
                        disabled={doneSubmit===""}
                        sx={{margin:2, width:270}}
                        variant="outlined"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
                <SubmitOTP show={doneSubmit===true} session={sessionOTP} fn={()=>{
                    setDoneSubmit(undefined);
                    setOpenModal(false);
                    // setOldPassword("");
                    setNewPassword("");
                    setRepeatPassword("");
                    // setShowOldPassword(false);
                    setShowNewPassword(false);
                    setShowRepeatPassword(false);
                }} />
            </ChangeAccountInfo>
        </>
    );
}