import { useContext } from 'react';
import { Link } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import WhatshotIcon from '@mui/icons-material/Whatshot';
import SettingsIcon from '@mui/icons-material/Settings';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

import { ContextStatus } from '../App';



export default function NavigationList() {
    const {mobile,handleDrawerClose,loginStatus} = useContext(ContextStatus);
    const navList = [
        {text:'Home page', link: "", icon: (<WhatshotIcon />)},
        // {text:'Hot deal', link: "/hotdeals", icon: (<GradeIcon />)},
        {text:'Cart', link: "/cart", icon: (<ShoppingCartIcon />), viewByLogin: true},
        {text:'Your Account', link: "/account", icon: (<FolderSharedIcon />), viewByLogin: true},
        {text:'Setting', link: "/setting", icon: (<SettingsIcon />)},
        {text:'Login', link: "/login", icon: (<LoginIcon />), viewByLogin: false},
        {text:'Logout', link: "/logout", icon: (<LogoutIcon />), viewByLogin: true},
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
                {navList.map((element) => (
                    (element.viewByLogin===undefined) || !(element.viewByLogin===true ^ loginStatus) ?(
                        <ListItem key={element.text} disablePadding sx={{ display: 'block' }} 
                        >
                            <Link to={element.link}
                            style={{ textDecoration: 'none' }}
                            onClick={()=>{
                                if(mobile) handleDrawerClose();
                            }}
                            >
                                <ListItemInside text={element.text} icon={element.icon} />
                            </Link>
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