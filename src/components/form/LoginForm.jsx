import * as React from 'react';
import { createBrowserHistory } from "history";
import axios from 'axios';
import validator from 'validator';

import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Modal from '@mui/material/Modal';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { ContextStatus } from '../../App';
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

export default function LoginForm(prop) {
  const goBack = prop.goBack!==false;
  const [showLoginForm,setShowLoginForm] = React.useState(true);
  const [loginUser,setLoginUser] = React.useState(null);
  const [loginPassword,setLoginPassword] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginError, setLoginError] = React.useState("Enter your username and password!");
  const [disableLoginInput, setDisableLoginInput] =React.useState(false);
  const { setLoginStatus, setServiceInfo} = React.useContext(ContextStatus);
  const history = createBrowserHistory();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const checkLogin = async (userName, password) => {
    if (!validator.isEmail(userName)) return {loginStatus: false, loginSession: null, loginError: "User name must be an email!"};
    else{
        setDisableLoginInput(true);
        axios({
            method: 'get',
            baseURL: 'https://fakeapi.meitoc.net',
            url: `/api/login?username=${userName}&password=${password}`,
          }).then(response => {
            const data =  response.data;
            if(data.status==="loggedin"){
                localStorage.setItem('loginSession',data.data.token);
                setShowLoginForm(false);
                //
                const themoviedb= data.data.services.find(item => item.service === "themoviedb");//load login info for layer 2
                console.log("Fakeapi.meitoc.net: You'r logged in.");
                setServiceInfo(themoviedb);
                //
                if(typeof prop.fn === 'function') prop.fn(false);
                setLoginStatus(true);
            } else if(data.error==="login_locked"){
                setLoginError( "The account is locked!");
                console.log( "Fakeapi.meitoc.net: The account is locked!");
              } else{
                setLoginError( "Wrong password or user name!");
                console.log( "Wrong password or user name!");
            }
            setDisableLoginInput(false);
          })
          .catch(error => {
            console.log(error)
            setLoginError("Check your internet connection!");
            console.log("Check your internet connection!");
            setDisableLoginInput(false);
        });
    }
}
    return (
      <div>
        <Modal 
          open={showLoginForm}
          onClose={()=> {
            setShowLoginForm(false);
            if(typeof prop.fn === 'function') prop.fn(false);
            goBack && history.back();
          }}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
          sx={{ ...style, width: "100vw", height: "100vh" , backgroundColor: "rgba(0,0,0,0.2)"}}
        >
          <Box sx={{ ...style, maxWidth: '350px' }}>
            <h2 id="parent-modal-title">Login</h2>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <div>
                  <TextField
                    sx={{ m: 1, width: '29ch' }}
                    id="outlined-user-input"
                    label="User"
                    type="user"
                    autoComplete="current-password"
                    onChange={(event)=>setLoginUser(event.target.value)}
                    disabled={disableLoginInput}
                  />
                  <FormControl sx={{ m: 1, width: '29ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
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
                  <p>{loginError}</p>
                  <FormControl>
                    <button onClick={async () =>{
                      checkLogin(loginUser, loginPassword);
                    }}
                    >
                      LOGIN
                    </button>
                  </FormControl>
                </div>
              </Box>
          </Box>
        </Modal>
      </div>
    );
}