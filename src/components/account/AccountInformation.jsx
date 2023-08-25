import { useContext, useState } from "react";
import { ContextStatus } from "../../App";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import Box from '@mui/material/Box';
import ChangeAccountInfo from "../info-change/ChangeAccountInfo";
// import Avatar from '@mui/material/Avatar';
// chang this function later for security
import addUserData from "../../features/fetch-data/addUserData";
import SubmitOTP from "./SubmitOTP";

const styleShow={display: 'flex', flexDirection: 'column', alignItems: 'center'};
const styleHide={display: 'none'};

export default function AccountInformation() {
    const {userData,setUserData} = useContext(ContextStatus);

    const [username, setUsername] = useState(userData.username);
    const [showUsername, setShowUsername] = useState(username);
    const [doneSubmitUsername, setDoneSubmitUsername] = useState(undefined);
    const [openModalUsername, setOpenModalUsername] = useState(false);
    
    const [email, setEmail] = useState(userData.email);
    const [showEmail, setShowEmail] = useState(email);
    const [doneSubmitEmail, setDoneSubmitEmail] = useState(undefined);
    const [openModalEmail, setOpenModalEmail] = useState(false);
    
    const [phone, setPhone] = useState(userData.phone);
    const [showPhone, setShowPhone] = useState(phone);
    const [doneSubmitPhone, setDoneSubmitPhone] = useState(undefined);
    const [openModalPhone, setOpenModalPhone] = useState(false);
    
    const [sessionOTP, setSessionOTP] = useState("");

    const handleSubmit = (setOpenModal,setDoneSubmit,dataName,dataValue) => {
        setOpenModal(true);
        setDoneSubmit("");
        async function checkResults() {
            try {
                const result = await addUserData(dataName, dataValue);
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
            checkResults();
      
    };
    return  (
        <>
            <Typography variant="h5" gutterBottom>
                Account informations
            </Typography>
            <Typography variant="h6" gutterBottom>
                - ID: {userData.id}
            </Typography>
            <Typography variant="h6" gutterBottom>
                - Username: {username}
            </Typography>
            <ChangeAccountInfo
                buttonName={username===undefined?"Add":"Change"}
                title="Account information"
                note={doneSubmitUsername===true?"":`After click submit, we will send you an OTP code via ${userData.phone!=undefined?"phone.":"email."}`}
                open={openModalUsername}
            >
                <div style={doneSubmitUsername!==true?styleShow:styleHide}>
                    <TextField
                        disabled={doneSubmitUsername===""}
                        sx={{margin:2, width:270}}
                        required
                        id="outlined-required"
                        label="Username"
                        value={showUsername}
                        onChange={(event)=>setShowUsername(event.target.value)}
                    />
                    <Typography sx={{display:"block",margin:2, width:270}} variant="caption" gutterBottom >
                        {doneSubmitUsername===false?
                            "Sorry! Something went be wrong. Try again or wait a minute."
                            :(<>Username must start with a letter.<br />
                            Username must be at least 5 characters long.<br />
                            Only letters, numbers, and _ are allowed.</>)
                        }
                    </Typography>
                    <Button
                        disabled={doneSubmitUsername===""}
                        sx={{margin:2, width:270}}
                        variant="outlined"
                        onClick={()=>handleSubmit(setOpenModalUsername,setDoneSubmitUsername,'username',showUsername)}
                    >
                        Submit
                    </Button>
                </div>
                <SubmitOTP show={doneSubmitUsername===true} session={sessionOTP} fn={()=>{
                    setDoneSubmitUsername(undefined);
                    setUserData({...userData,username:showUsername.toLowerCase()});
                    setUsername(showUsername.toLowerCase());
                    setOpenModalUsername(false);
                }} />
            </ChangeAccountInfo>
            <Typography variant="h6" gutterBottom>
                - Email: {email}
            </Typography>
            <ChangeAccountInfo
                buttonName={email===undefined?"Add":"Change"} title="Account information"
                note={doneSubmitEmail===true?"":`After click submit, we will send you an OTP code via ${userData.email==undefined || userData.phone==undefined?"email.":"phone."}`}
                open={openModalEmail}
            >
                <div style={doneSubmitEmail!==true?styleShow:styleHide}>
                    <TextField
                        disabled={doneSubmitEmail===""}
                        sx={{margin:2, width:270}}
                        required
                        id="outlined-required"
                        label="Email"
                        value={showEmail}
                        onChange={(event)=>setShowEmail(event.target.value)}
                    />
                    <Typography sx={{display:(doneSubmitEmail===false?"block":"none"),margin:2, width:270}} variant="caption" gutterBottom>
                        Sorry! Something went be wrong. Try again or wait a minute.
                    </Typography>
                    <Button
                        disabled={doneSubmitEmail===""}
                        sx={{margin:2, width:270}}
                        variant="outlined"
                        onClick={()=>handleSubmit(setOpenModalEmail,setDoneSubmitEmail,'email',showEmail)}
                    >
                        Submit
                    </Button>
                </div>
                <SubmitOTP show={doneSubmitEmail===true} session={sessionOTP} fn={()=>{
                    setDoneSubmitEmail(undefined);
                    setUserData({...userData,email:showEmail});
                    setEmail(showEmail);
                    setOpenModalEmail(false);
                }} />
            </ChangeAccountInfo>
            <Typography variant="h6" gutterBottom>
                - Phone: {phone}
            </Typography>
            <ChangeAccountInfo
                buttonName={phone===undefined?"Add":"Change"}
                title="Account information"
                note={doneSubmitPhone===true?"":`After click submit, we will send you an OTP code via ${userData.phone==undefined || userData.email==undefined?"phone.":"email."}`}
                open={openModalPhone}
            >
                <div style={doneSubmitPhone!==true?styleShow:styleHide}>
                    <TextField
                        disabled={doneSubmitPhone===""}
                        sx={{margin:2, width:270}}
                        required
                        id="outlined-required"
                        label="Phone"
                        value={showPhone}
                        onChange={(event)=>{
                            if(/^0\d*$/.test(event.target.value)) setShowPhone(event.target.value);
                        }}
                    />
                    <Typography sx={{display:(doneSubmitPhone===false?"block":"none"),margin:2, width:270}} variant="caption" gutterBottom>
                        Sorry! Something went be wrong. Try again or wait a minute.
                    </Typography>
                    <Button
                        disabled={doneSubmitPhone===""}
                        sx={{margin:2, width:270}}
                        variant="outlined"
                        onClick={()=>handleSubmit(setOpenModalPhone,setDoneSubmitPhone,'phone',showPhone)}
                    >
                        Submit
                    </Button>
                </div>
                <SubmitOTP show={doneSubmitPhone===true} session={sessionOTP} fn={()=>{
                    setDoneSubmitPhone(undefined);
                    setUserData({...userData,phone:showPhone});
                    setPhone(showPhone);
                    setOpenModalPhone(false);
                }} />
            </ChangeAccountInfo>
        </>
    );
}