import * as React from 'react';
import CheckSession from './features/authentication/CheckSession';
import Layout from './layout/Layout';
export const ContextStatus = React.createContext();

export default function App() {
    const [reload, setReload] = React.useState(true);
    const [mobile, setMobile] = React.useState((parseInt(screen.width))<500);
    const [viewWidth, setViewWidth] = React.useState(screen.width);
    const [darkMode, setDarkMode] = React.useState (localStorage.getItem('darkMode')==='true');
    const [loginStatus, setLoginStatus] = React.useState(null); //check loggedIn for normal, check logSession for secure
    //Infomation layer 1
    const [serviceInfo,setServiceInfo] = React.useState([]);
    //Cutomer's cart
    const [favoriteData, setFavoriteData] = React.useState ([]);
    
    // Filter and search
    const [sortBy, setSortBy] = React.useState ("recommend");
    const [searchInput, setSearchInput]= React.useState("");
    const [selectCategory, setSelectCategory] = React.useState ("");
  
    // const [loginFormOpen, setLoginFormOpen] = React.useState(true);
    const [movieList, updateMovieList] = React.useState([]);//use for fetch data
    const [showMovieList, setShowMovieList] = React.useState(null);//use for show data
    //User info
    const [userData, setUserData] = React.useState("");//use for show data
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
        reload, setReload,
        sortBy, setSortBy,
        searchInput, setSearchInput,
        selectCategory, setSelectCategory,
        userData, setUserData,
        viewWidth, setViewWidth,
        }}>
          <CheckSession>
            <Layout />
          </CheckSession>
        </ContextStatus.Provider>
    );
}
  