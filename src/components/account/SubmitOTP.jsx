import { useState} from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import fetchSubmitOTP from "../../features/fetch-data/fetchSubmitOTP.jsx";

export default function SubmitOTP(prop) {
    const [numberOTP,setNumberOTP]=useState("");
    const [errorOTP,setErrorOTP]=useState("");

    const [doneSubmit, setDoneSubmit] = useState(undefined);
    const handleSubmit = () => {
        async function checkResults() {
            try {
                const result1 = await fetchSubmitOTP(prop.session,numberOTP);
                console.log(result1);
                if (result1.status !== true) {
                setDoneSubmit(false);
                setErrorOTP(result1.comment)
                } else {
                    setDoneSubmit(true);
                    if(result1.token!==undefined && result1.token!==null && result1.token!=="") localStorage.setItem('loginSession',result1.token);
                    prop.fn();
                }
            } catch (error) {
              console.error(error);
              setDoneSubmit(false);
            }
          }
          if(numberOTP!=="" && prop.session!==undefined && prop.session!==null && prop.session!==""){
            checkResults();
          }else{
            setDoneSubmit(false);
          }
      
    };
    return  (
        prop.show===true?
        (<div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Enter OTP:
            </Typography>
            <TextField
                disabled={doneSubmit===""}
                sx={{margin:2, width:270}}
                id="outlined-otp"
                type='text'
                autoComplete="none"
                value={numberOTP}
                onChange={event=>{if(!isNaN(event.target.value)) setNumberOTP(event.target.value)}}
            />
            <Typography sx={{display:(doneSubmit===false?"block":"none"),margin:2, width:270}} variant="caption" gutterBottom>
                {errorOTP==="login_locked"?"The phone or email is being locked in 5 minutes!":errorOTP==="wrong_otp"?'Wrong OTP.': errorOTP==="overtime"?'Overtime. Please reload page and try again!':"Something went wrong! Try again or wait a minute."}
            </Typography>
            <Button
                disabled={doneSubmit===""}
                sx={{margin:2, width:270}}
                variant="outlined"
                onClick={handleSubmit}
            >
                Submit OTP
            </Button>
        </div>)
        :
        null
    );
}