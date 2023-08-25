import { useContext } from 'react';
import { Link } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import LoginIcon from '@mui/icons-material/Login';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import SearchIcon from '@mui/icons-material/Search';

import Divider from '@mui/material/Divider';

import { ContextStatus } from '../../App';



export default function NavigationList() {
    const {mobile, handleDrawerClose,loginStatus, setShowLoginForm} = useContext(ContextStatus);
    const navList = [
        // viewByLogin: true: only be shown when logged in / false: only be shown when logged out / not set: always be shown
        {text:'Home page', link: "", icon: (<WhatshotIcon />)},
        {text:'Login to view more', fn: ()=>setShowLoginForm(true), icon: (<LoginIcon />), viewByLogin: false},
        {text:'Favorite', link: "/favorite", icon: (<FavoriteIcon />), viewByLogin: true},
        {icon:(<Divider />)},
        {text:'Now Playing', link: "/movielists/nowplaying", icon: (<ArrowForwardIosIcon />)},
        {text:'Popular', link: "/movielists/popular", icon: (<ArrowForwardIosIcon />)},
        {text:'TopRated', link: "/movielists/top_rated", icon: (<ArrowForwardIosIcon />)},
        {text:'Upcoming', link: "/movielists/upcoming", icon: (<ArrowForwardIosIcon />)},
        {icon:(<Divider />)},
        {text:'Genres', link: "/genres", icon: (<PhotoCameraFrontIcon />)},
        {text:'Search', link: "/search", icon: (<SearchIcon />)},
    ];
    const ListItemInside = (prop)=>{
        return(
            <ListItemButton
                sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                }}
            >
                <ListItemIcon
                sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                }}
                >
                    {prop.icon}
                </ListItemIcon>
                <ListItemText primary={prop.text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        )
    }
    return (
        <>
            <List>
                {navList.map((element,index) => (
                    (element.viewByLogin===undefined) || !(element.viewByLogin===true ^ loginStatus===true) ?(
                        <ListItem key={index} disablePadding sx={{ display: 'block' }} 
                        >
                            {element.text===undefined?
                            (<>{element.icon}</>)
                            :
                                <Link to={element.link}
                                style={{ textDecoration: 'none' , color: 'inherit'}}
                                onClick={()=>{
                                    if(typeof element.fn === "function") element.fn();// handleDrawerClose();
                                    if(mobile) handleDrawerClose();//use only for mobile. when you enable this, please clear the line before, and add mobile to useContext
                                }}
                                >
                                    <ListItemInside text={element.text} icon={element.icon} />
                                </Link>
                            }
                            {element.child!==undefined? element.child : ""}
                        </ListItem>
                    )
                    :
                    ""
                ))}
            </List>
        </>
    )
}