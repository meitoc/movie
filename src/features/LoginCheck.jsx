
import validator from 'validator';
const checkLogin = async (userName, password) => {
    if (!validator.isEmail(userName)) return {loginStatus: false, loginSession: null, loginError: "User name must be an email!"};
    //Replace code lines below by fetching data later
    const sessionCode = "123Abcdef";
    if(userName==="admin@gmail.com" && password==="1234") {
        localStorage.setItem('loginStatus',"true");
        localStorage.setItem('loginSession',sessionCode);
        return {loginStatus: true , loginSession: sessionCode, lòoginError: null} ;
    }
    localStorage.setItem('loginStatus',"false");
    return {loginStatus: false, loginSession: null, loginError: "Wrong password or user name!"};
    // return {loginStatus: false, loginSession: null, loginError: "User name be locked!"};
}
export {checkLogin}