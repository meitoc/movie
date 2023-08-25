import * as React from 'react';
import { createBrowserHistory } from "history";
// import axios from 'axios';
// import validator from 'validator';

import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Modal from '@mui/material/Modal';

import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { ContextStatus } from '../../App';
import SubmitOTP from '../account/SubmitOTP';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const styleShow={display: 'flex', flexDirection: 'column', alignItems: 'center'};
const styleHide={display: 'none'};

export default function LoginForm(prop) {
  //common hook
  const goBack = prop.goBack!==false;
  const { setLoginStatus,showLoginForm,setShowLoginForm} = React.useContext(ContextStatus);
  const [openPart,setOpenPart] = React.useState("login");
  
  //Login
  const [loginUser,setLoginUser] = React.useState(null);
  const [loginPassword,setLoginPassword] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [note, setNote] = React.useState("Enter your username and password!");
  const [disableLoginInput, setDisableLoginInput] =React.useState(false);
  const history = createBrowserHistory();
  //Forgot password
  const [forgotUser,setForgotUser] = React.useState(null);
  //Create user
  const [createUser,setCreateUser] = React.useState(null);
  const [createPassword,setCreatePassword] = React.useState(null);
  //OTP
  const [sessionOTP,setSessionOTP] = React.useState(null);
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  function isPhoneNumberOrEmail(input) {
    const isEmail = /\S+@\S+\.\S+/.test(input);
    const isPhoneNumber = /^0\d{9}$/.test(input);
    return isEmail || isPhoneNumber;
  }
  //function for login
  const checkLogin = async (username, password) => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({username: `${username}`, password: `${password}`})
    };
    if(isPhoneNumberOrEmail(username)) {
      fetch(`https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/authentication/token/login`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if(response.status===true){
            if(response.token!==undefined) localStorage.setItem('loginSession',response.token);
            setShowLoginForm(false);
            console.log("Movie.meitoc.net: You'r logged in.");
            // setServiceInfo(response);
            setLoginStatus(true);
        } else {
          setLoginStatus(false);
          if(response.comment==="login_locked"){
            setNote( "The account is locked!");
            console.log( "Movie.meitoc.net: The account is locked!");
          } else{
            setNote( "Wrong password or user name!");
            console.log( "Movie.meitoc.net: Wrong password or user name!");
          }
        }
        setDisableLoginInput(false);
      })
      .catch(error => {
        console.log(error)
        setNote("Check your internet connection!");
        console.log("Movie.meitoc.net: Check your internet connection!");
        setDisableLoginInput(false);
      })
    }
  }
  //function for create new account
  const createAccount = async (username, password) => {
    setDisableLoginInput(true);
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({username: `${username}`, password: `${password}`})
    };
    if(isPhoneNumberOrEmail(username)) {
      // username=encodeURIComponent(username);
      // password=encodeURIComponent(password);
      fetch(`https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/account/create-account`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if(response.status===true){
            setSessionOTP(response.waiting_key);
            setOpenPart('otp');
        } else {
            switch(response.comment){
              case "existing_email":  setNote("Email is existing or being processed!"); break;
              case "existing_phone":  setNote("Phone number is existing or invalid now!"); break;
              default:  setNote("Something went wrong! Try again or wait a minute."); break;
            }
        }
        setDisableLoginInput(false);
      })
      .catch(error => {
        console.log(error)
        setNote("Check your internet connection!");
        console.log("Movie.meitoc.net: Check your internet connection!");
        setDisableLoginInput(false);
      })
    }
  }
  //function for submit forgot password
  const forgotPassword = async (username) => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({username: `${username}`})
    };
    if(isPhoneNumberOrEmail(username)) {
      // username=encodeURIComponent(username);
      // password=encodeURIComponent(password);
      fetch(`https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/authentication/token/forgot-password`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if(response.status===true){
          setSessionOTP(response.waiting_key);
          setOpenPart('otp');
        } else {
          setLoginStatus(false);
          if(response.comment==="login_locked"){
            setNote( "The account is locked!");
            console.log( "Movie.meitoc.net: The account is locked!");
          } else{
            setNote( "User name is invalid!");
            console.log( "Movie.meitoc.net: User name is invalid!");
          }
        }
        setDisableLoginInput(false);
      })
      .catch(error => {
        console.log(error)
        setNote("Check your internet connection!");
        console.log("Movie.meitoc.net: Check your internet connection!");
        setDisableLoginInput(false);
      })
    }
  }
  return (
    <div>
      <Modal 
        open={showLoginForm}
        onClose={()=> {
          setShowLoginForm(false);
          goBack && history.back();
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{ ...style, width: "100vw", height: "100vh" , backgroundColor: "rgba(0,0,0,0.2)"}}
      >
        <Box sx={{ ...style, maxWidth: '350px' }}>
          <h2 id="parent-modal-title">{openPart=='login'?'Login':openPart=='otp'?'Submit OTP':openPart=='create_account'?'Create New Acccount':'Forgot Password'}</h2>
            <Box >
              <div style={openPart==="login"?styleShow:styleHide}>
                <TextField
                   sx={{margin:2, width:270}}
                  id="outlined-user-input"
                  label="User"
                  type="user"
                  autoComplete="username"
                  onChange={(event)=>setLoginUser(event.target.value)}
                  disabled={disableLoginInput}
                />
                <FormControl  sx={{margin:2, width:270}} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    autoComplete="current-password"
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(event)=>setLoginPassword(event.target.value)}
                    disabled={disableLoginInput}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <p>{note}</p>
                  <Button
                    variant="outlined"
                    sx={{margin:2, width:270}}
                    onClick={async () =>{
                      checkLogin(loginUser, loginPassword);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{margin:2, width:270}}
                    onClick={()=>{
                      setOpenPart("create_account");
                      setNote('Use your email or phone number (Vietnam only)')
                    }}
                  >
                    Create new account
                  </Button>
                  <Link onClick={()=>{
                    setOpenPart("forgot_password");
                    setNote('You can log in via OTP method then change your password in Menu Profile.')
                  }}
                    underline="none"
                    style={{cursor: "pointer"}}
                  >
                    {'Forgot password?'}
                  </Link>
              </div>
              <div style={openPart==="create_account"?styleShow:styleHide}>
                <TextField
                   sx={{margin:2, width:270}}
                  id="outlined-user-input"
                  label="Email or Phone"
                  type="user"
                  autoComplete="username"
                  onChange={(event)=>setCreateUser(event.target.value)}
                  disabled={disableLoginInput}
                />
                <FormControl  sx={{margin:2, width:270}} variant="outlined">
                  <InputLabel htmlFor="outlined-create-password">Password</InputLabel>
                  <OutlinedInput
                    autoComplete="new-password"
                    id="outlined-create-password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(event)=>setCreatePassword(event.target.value)}
                    disabled={disableLoginInput}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <p>{note}</p>
                  <Button
                    variant="outlined"
                    sx={{margin:2, width:270}}
                    onClick={async () =>{
                      createAccount(createUser, createPassword);
                    }}
                  >
                    Submit new account
                  </Button>
                  <Link onClick={()=>{
                      setOpenPart("login");
                      setNote('Enter your username and password!')
                    }}
                    underline="none"
                    style={{cursor: "pointer"}}
                  >
                    {'Go back'}
                  </Link>
              </div>
              <div style={openPart==="forgot_password"?styleShow:styleHide}>
                <TextField
                   sx={{margin:2, width:270}}
                  id="outlined-forgot-password-input"
                  label="Email or Phone"
                  type="user"
                  autoComplete="username"
                  onChange={(event)=>setForgotUser(event.target.value)}
                  disabled={disableLoginInput}
                />
                <p>{note}</p>
                  <Button
                    variant="outlined"
                    sx={{margin:2, width:270}}
                    onClick={async () =>{
                      forgotPassword(forgotUser);
                    }}
                  >
                    Submit
                  </Button>
                  <Link onClick={()=>{
                      setOpenPart("login");
                      setNote('Enter your username and password!')
                    }}
                    underline="none"
                    style={{cursor: "pointer"}}
                  >
                    {'Go back'}
                  </Link>
              </div>
              <div style={openPart==="otp"?styleShow:styleHide}>
                <SubmitOTP show={openPart==='otp'} session={sessionOTP} fn={()=>{
                    // setDoneSubmit(undefined);
                    setShowLoginForm(false);
                    setLoginStatus(true);
                }} />
              </div>
            </Box>
        </Box>
      </Modal>
    </div>
  );
}