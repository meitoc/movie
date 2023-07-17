import * as React from 'react';
// import { Outlet } from 'react-router-dom';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Logo } from '../components/small-component/Logo';

import Drawer from '@mui/material/Drawer';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import NavigationList from './modules/NavigationList';
import AccountAvatar from './modules/AccountAvatar';

// import { checkSession } from '../features/authentication/checkSession';
import { ContextStatus } from '../App';
import { Outlet } from 'react-router-dom';
// import CheckUserSession from '../features/authentication/CheckUserSession';

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

export default function Layout() {
    const { darkMode,mobile, setMobile}= React.useContext(ContextStatus);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    //============
    React.useEffect(()=>{
        const handleResize = ()=>{
          setMobile((parseInt(screen.width))<500);
      }
      window.addEventListener('resize', handleResize);
      window.addEventListener('onload', handleResize);
    },[setMobile])
    if(mobile) drawerWidth=parseInt(screen.width);
    else drawerWidth=240;
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
        <ThemeProvider theme={darkTheme}>
          {/* <CheckUserSession> */}
            <Box display= 'flex' justifyContent='center'>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar sx={{ display: 'flex', flexWrap: "noWrap" , justifyContent: 'space-between', }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { visibility: 'hidden' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Logo />
                    <Box
                        sx={{display: "flex", flexWrap: "nowrap"}}
                    >
                        <AccountAvatar />
                    </Box>
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
                <Main open={open} >
                    <DrawerHeader />
                    <Outlet />
                </Main>
            </Box>
          {/* </CheckUserSession> */}
      </ThemeProvider>
    );
}
  