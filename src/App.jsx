import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';


import Drawer from '@mui/material/Drawer';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import TopMenuSearch from './shared/TopMenuSearch';
import NavigationList from './shared/NavigationList';
let drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // width: window.innerWidth,
    padding: theme.spacing(4),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        // width: (window.innerWidth-drawerWidth),
        transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
export const ContextStatus = React.createContext();
export default function App() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [mobile, setMobile] = React.useState(parseInt(screen.width)<500);
    const [darkMode, setDarkMode] = React.useState (localStorage.getItem('darkMode')==='true');
    const [loginStatus, setLoginStatus] = React.useState(localStorage.getItem('loginStatus')==='true'); //check loggedIn for normal, check logSession for secure
    const [loginSession, setLoginSession] = React.useState(localStorage.getItem('loginSession')); //check loggedIn for normal, check logSession for secure
    // const [loginFormOpen, setLoginFormOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    //============
    const handleResize = ()=>{
        setMobile(parseInt(screen.width)<500);
    }
    window.addEventListener('resize', handleResize);
    window.addEventListener('onload', handleResize);
    if(mobile) drawerWidth=parseInt(screen.width);
    else drawerWidth=240;
    console.log(drawerWidth);
    //============
    const darkTheme = createTheme({
        palette: {
          mode: darkMode?'dark':'light',
        },
      });
    //============
    const handleDrawerClose = () => {
        setOpen(false);
    };
    
    return (
        <ContextStatus.Provider value={{darkMode,setDarkMode,handleDrawerClose,loginStatus,setLoginStatus,loginSession,setLoginSession}}>
            <ThemeProvider theme={darkTheme}>
                <Box display= 'flex' justifyContent='center'>
                    <CssBaseline />
                    <AppBar position="fixed" open={open}>
                        <Toolbar style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            GoJob
                        </Typography>
                        <TopMenuSearch />
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <NavigationList />
                    </Drawer>
                    <Main open={open}>
                        <DrawerHeader />
                        <Outlet />
                    </Main>
                </Box>
            </ThemeProvider>
        </ContextStatus.Provider>
    );
}
  