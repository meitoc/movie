import * as React from 'react';
// import CheckSession from './features/authentication/CheckSession';
// import { AuthenCheck } from './features/authentication/AuthenCheck';
import Layout from './layout/Layout';
export const ContextStatus = React.createContext();

export default function App() {
    const [mobile, setMobile] = React.useState((parseInt(screen.width))<500);
    const [viewWidth, setViewWidth] = React.useState(screen.width);
    
    // const [darkMode, setDarkMode] = React.useState (localStorage.getItem('darkMode')=='true');
    const [darkMode, setDarkMode] = React.useState (localStorage.getItem('darkMode')!=='false');//the line before set dark mode be true
    const [loginStatus, setLoginStatus] = React.useState(null); //check loggedIn for normal, check logSession for secure
    
    //Infomation layer 1
    const [serviceInfo,setServiceInfo] = React.useState(null);
    
    //Cutomer's cart
    const [favoriteData, setFavoriteData] = React.useState ([]);
  
    // const [loginFormOpen, setLoginFormOpen] = React.useState(true);
    const [movieList, updateMovieList] = React.useState([]);//use for fetch data
    const [showMovieList, setShowMovieList] = React.useState(null);//use for show data
    
    //User info
    const [userData, setUserData] = React.useState(null);//use for show data
    
    //============
    const handleResize = ()=>{
        setMobile((parseInt(screen.width))<500);
    }
    window.addEventListener('resize', handleResize);
    window.addEventListener('onload', handleResize);
    //============
    
    return (
        <ContextStatus.Provider
        value={{
        darkMode,setDarkMode,
        loginStatus,setLoginStatus,
        serviceInfo,setServiceInfo,
        movieList, updateMovieList,
        showMovieList, setShowMovieList,
        favoriteData, setFavoriteData,
        mobile,
        userData, setUserData,
        viewWidth, setViewWidth,
        }}>
            <Layout />
        </ContextStatus.Provider>
    );
}
  