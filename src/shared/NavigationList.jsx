import { Link } from 'react-router-dom';
import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import GradeIcon from '@mui/icons-material/Grade';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SettingsIcon from '@mui/icons-material/Settings';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import MailIcon from '@mui/icons-material/Mail';
import { useContext } from 'react';
import { ContextStatus } from '../App';


import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

export default function NavigationList() {
    const {mobile,handleDrawerClose,loginStatus} = useContext(ContextStatus);
    const navList = [
        {text:'Hot Jobs', link: "", icon: (<WhatshotIcon />)},
        {text:'News', link: "/news", icon: (<GradeIcon />)},
        {text:'Your Profile', link: "/profile", icon: (<FolderSharedIcon />), viewByLogin: true},
        {text:'Interview Invitation', link: "/interviews", icon: (<MailIcon />), viewByLogin: true},
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
                        <>
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
                            </ListItem>
                            {element.child!==undefined? element.child : ""}
                        </>
                    )
                    :
                    ""
                ))}
            </List>
            
        </>
    )
}