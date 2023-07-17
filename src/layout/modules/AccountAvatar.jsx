import { Link } from 'react-router-dom';
import { useContext,useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import Badge from '@mui/material/Badge';
// import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import FetchUserData from '../../features/fetch-data/FetchUserData';
import { ContextStatus } from '../../App';

export default function AccountAvatar() {
    const {userData} = useContext(ContextStatus);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <FetchUserData>
        {userData!==undefined && userData!==null?
        <>
          <Button  onClick={handleClick} >
            <Avatar 
              sx={{ width: 27, height: 27}}
              alt={userData.name}
              src={
                userData.avatar.tmdb.avatar_path!=null && userData.avatar.tmdb.avatar_path!=undefined?
                `https://www.themoviedb.org/t/p/w150_and_h150_face${userData.avatar.tmdb.avatar_path}`
                :
                ""
              }
            
            /> 
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            
            <MenuItem onClick={handleClose}>
              <Link to="/account" style={{ textDecoration: 'none', color: "inherit" }} >Profile</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/setting" style={{ textDecoration: 'none', color: "inherit" }} >Setting</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/logout" style={{ textDecoration: 'none', color: "inherit" }} >Logout</Link>
            </MenuItem>
          </Menu>
        </>
        :
          null}
      
      </FetchUserData>
    );
}