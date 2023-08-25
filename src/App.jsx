import * as React from 'react';
import Layout from './layout/Layout';
// import { Helmet } from 'react-helmet';

export const ContextStatus = React.createContext();

export default function App() {
    const [mobile, setMobile] = React.useState((parseInt(screen.width))<500);
    const [viewWidth, setViewWidth] = React.useState(screen.width);
    
    // const [darkMode, setDarkMode] = React.useState (localStorage.getItem('darkMode')=='true');
    const [darkMode, setDarkMode] = React.useState (localStorage.getItem('darkMode')!=='false');//the line before set dark mode be true
    const [loginStatus, setLoginStatus] = React.useState(null); //check loggedIn for normal, check logSession for secure
    
    //Infomation layer 1 disabled
    // const [serviceInfo,setServiceInfo] = React.useState(null);
    
    //Cutomer's cart
    const [favoriteData, setFavoriteData] = React.useState ([]);
  
    const [showLoginForm, setShowLoginForm] = React.useState(false);

    const [movieList, updateMovieList] = React.useState([]);//use for fetch data
    const [showMovieList, setShowMovieList] = React.useState(null);//use for show data
    
    //User info
    const [userData, setUserData] = React.useState(null);//use for show data
    
    //============
    // const handleResize = ()=>{
    //     setMobile((parseInt(screen.width))<500);
    // }
    // window.addEventListener('resize', handleResize);
    // window.addEventListener('onload', handleResize);
    //============
    React.useEffect(() => {
        const handleResize = () => {
            setMobile(parseInt(screen.width) < 500);
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <ContextStatus.Provider
        value={{
        darkMode,setDarkMode,
        loginStatus,setLoginStatus,
        movieList, updateMovieList,
        showMovieList, setShowMovieList,
        favoriteData, setFavoriteData,
        mobile,
        userData, setUserData,
        viewWidth, setViewWidth,
        showLoginForm, setShowLoginForm
        }}>
            <Layout />
        </ContextStatus.Provider>
    );
}
  