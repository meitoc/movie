import * as React from 'react';
import { ContextStatus } from "../App";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import { Height } from '@mui/icons-material';
// import Button from '@mui/material/Button';
// import * as Yup from 'yup';
import { checkLogin } from '../features/LoginCheck';
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
  const [loginUser,setLoginUser] = React.useState(null);
  const [loginPassword,setLoginPassword] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const {setLoginStatus, setLoginSession} = React.useContext(ContextStatus);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Modal 
        open={prop.open}
        onClose={prop.handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{ ...style, width: "100vw", height: "100vh" , backgroundColor: "rgba(0,0,0,0.2)"}}
      >
        <Box sx={{ ...style, maxWidth: '350px' }}>
          <h2 id="parent-modal-title">Login</h2>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <div>
                <FormControl sx={{ m: 1, minWidth: '28ch' }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-user">User</InputLabel>
                  <Input
                    id="standard-adornment-user"
                    onChange={(event)=>setLoginUser(event.target.value)}></Input>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: '28ch' }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(event)=>setLoginPassword(event.target.value)}
                    endAdornment={
                      <InputAdornment position="end"
                      >
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl>
                  <button onClick={async () =>{
                    const check = await checkLogin(loginUser, loginPassword);
                    if(check.loginStatus) {
                      prop.handleClose();
                      setLoginStatus(check.loginStatus);
                      setLoginSession(check.loginSession);
                    }
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