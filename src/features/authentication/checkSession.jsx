import axios from "axios";

export async function checkSession() {
  const session = localStorage.getItem('loginSession');
  console.log(session);
  try {
    const response = await axios.get(`https://fakeapi.meitoc.net/api/checktoken?token=${session}`);
    const data = response.data;
    console.log(data);
    if (data.status === "newtoken") {
      localStorage.setItem('loginSession', data.data.token);
      return true;
    } else if (data.status === "loggedin") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}