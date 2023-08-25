import { useContext,useState } from "react";
import { ContextStatus } from "../../App";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import ChangeAccountInfo from "../info-change/ChangeAccountInfo";
import addUserData from "../../features/fetch-data/addUserData";

const styleShow={display: 'flex', flexDirection: 'column', alignItems: 'center'};
const styleHide={display: 'none'};

function isLeapYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) return 1;
    else return 0;
}
function parseBirthday(str) {
    if(str!==null && str!==undefined && str!==""){
        const parts = str.split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);

        return {
        day: day,
        month: month,
        year: year
        };
    }
    else return {
        day: 1,
        month: 1,
        year: 2000
    };
}
const startYear = 1940;
const endYear = 2023;
const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);
const dayOfMonth = [[31,28,31,30,31,30,31,31,30,31,30,31],[31,29,31,30,31,30,31,31,30,31,30,31]];
export default function UserInformation() {
    const {userData,setUserData} = useContext(ContextStatus);

    let userDataBirthday=parseBirthday(userData.birthday);

    const [savedRealname, setSavedRealname] = useState(userData.realname??"");
    const [savedGender, setSavedGender] = useState(userData.gender??"Male");
    const [savedBirthday, setSavedBirthday] = useState(userData.birthday??"");
    const [savedAddress, setSavedAddress] = useState(userData.address??"");

    const [secretBirthday, setSecretBirthday] = useState(userData.birthday===null || userData.birthday===undefined || userData.birthday==='');
    const [dayBirth,setDayBirth] = useState(userDataBirthday.day);
    const [monthBirth,setMonthBirth] = useState(userDataBirthday.month);
    const [yearBirth,setYearBirth] = useState(userDataBirthday.year);
    const [leapYear,setLeapYear] = useState(isLeapYear(userDataBirthday.year));
    const [dayMonth,setDayMonth] = useState(dayOfMonth[isLeapYear(userDataBirthday.year)][userDataBirthday.month-1]);
    
    const [realname, setRealname] = useState(userData.realname??"");
    const [address, setAddress] = useState(userData.address??"");
    const [gender, setGender] = useState(userData.gender??"Male");

    const [doneSubmit, setDoneSubmit] = useState(undefined);
    const [openModal, setOpenModal] = useState(false);

    const handleSubmit = () => {
        // Sử dụng giá trị đã nhập ở đây
        setDoneSubmit("");
        setOpenModal(true);
        console.log(monthBirth)//test
        console.log(yearBirth)//test
        console.log(`${dayBirth}/${monthBirth}/${yearBirth}`)//test
        async function checkResults() {
            try {
                let collectResult=userData;
                const result1 = await addUserData("gender", gender);
                if(result1.status===true) {
                    setSavedGender(gender);
                    collectResult={...collectResult,gender};
                }
                const result2 = await (secretBirthday === false
                    ? addUserData("birthday", `${dayBirth}/${monthBirth}/${yearBirth}`)
                    : addUserData("birthday", ``));
                if(result2.status===true) {
                    setSavedBirthday(secretBirthday?"":`${dayBirth}/${monthBirth}/${yearBirth}`)
                    collectResult={...collectResult,birthday: (secretBirthday?"":`${dayBirth}/${monthBirth}/${yearBirth}`)};
                }
                const result3 = await addUserData("address", address);
                if(result3.status===true) {
                    setSavedAddress(address);
                    collectResult={...collectResult,address};
                }
                const result4 = await addUserData("realname", realname);
                if(result4.status===true) {
                    setSavedRealname(realname);
                    collectResult={...collectResult,realname};
                }
                setUserData(collectResult);
                // setDisableInput(false);
                if (result1.status !== true || result2.status !== true || result3.status !== true || result4.status !== true) {
                    setDoneSubmit(false);
                } else {
                    setDoneSubmit(undefined);
                    setOpenModal(false);
                }
            } catch (error) {
              console.error(error);
              setDoneSubmit(false);
            }
          }
          
          checkResults();
      
    };
    return  (
        <>
            <Typography variant="h5" gutterBottom>
                Personal informations
            </Typography>
            <Typography variant="h6" gutterBottom>
                - Full name: {savedRealname}
            </Typography>
            <Typography variant="h6" gutterBottom>
                - Gender: {savedGender}
            </Typography>
            <Typography variant="h6" gutterBottom>
                - Birth day: {savedBirthday}
            </Typography>
            <Typography variant="h6" gutterBottom>
                - Address: {savedAddress}
            </Typography>
            <ChangeAccountInfo
                buttonName="Change"
                title="Change information"
                submit={handleSubmit}
                open = {openModal===true} 
            >
                <div style={doneSubmit!==true?styleShow:styleHide}>
                    <TextField
                        disabled={doneSubmit===""}
                        sx={{margin:2, width:270}}
                        id="outlined-real-name"
                        label="Full name"
                        autoComplete="realname"
                        value={`${realname}`}
                        onChange={event => setRealname(event.target.value)}
                    />
                    <TextField
                        disabled={doneSubmit===""}
                        sx={{margin:2, width:270}}
                        id="gender"
                        select
                        label="Gender"
                        value={gender}
                        onChange={event=>setGender(event.target.value)}
                    >
                        <MenuItem value="Male">
                            Male
                        </MenuItem>
                        <MenuItem value="Female">
                            Female
                        </MenuItem>
                        <MenuItem value="Other">
                            Other
                        </MenuItem>
                    </TextField>
                    <TextField
                        disabled={doneSubmit===""}
                        sx={{margin:2, width:270}}
                        id="show-birthday"
                        select
                        label="Birthday"
                        value={secretBirthday===true?"secret":"show"}
                        autoComplete="show-birthday"
                        onChange={event =>{
                            if(event.target.value==="secret") setSecretBirthday(true);
                            else setSecretBirthday(false);
                        }}
                    >
                        <MenuItem value="secret" >
                            Keep a secret
                        </MenuItem>
                        <MenuItem value="show" >
                            Show
                        </MenuItem>
                    </TextField>
                    <Box sx={{margin:1, width:270}}>
                        <TextField
                            disabled={doneSubmit==="" || secretBirthday}
                            sx={{margin:1, width:65}}
                            id="bday-day"
                            select
                            label="Day"
                            value={`${dayBirth}`}
                            autoComplete="bday-day"
                            onChange={event=> setDayBirth(event.target.value)}
                        >
                            {Array.from({ length: dayMonth }, (_, index) => (
                                <MenuItem value={index+1} key={index+1}>
                                {index+1}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            disabled={doneSubmit==="" || secretBirthday}
                            sx={{margin:1, width:65}}
                            id="bday-month"
                            select
                            label="Month"
                            value={monthBirth}
                            autoComplete="bday-month"
                            onChange={event =>{
                                setMonthBirth(event.target.value);
                                setDayMonth(dayOfMonth[leapYear][event.target.value-1]);
                            }}
                        >
                            {Array.from({ length: 12 }, (_, index) => (
                                <MenuItem value={index+1} key={index+1}>
                                {index+1}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            disabled={doneSubmit==="" || secretBirthday}
                            sx={{margin:1, width:90}}
                            id="bday-year"
                            select
                            label="Year"
                            value={yearBirth}
                            autoComplete="bday-year"
                            onChange={event =>{
                                setYearBirth(event.target.value);
                                let newLeapYear=isLeapYear(event.target.value);
                                setLeapYear(newLeapYear);
                                setDayMonth(dayOfMonth[newLeapYear][monthBirth-1]);
                            }}
                        >
                            {years.map(year => (
                                <MenuItem value={year} key={year}>
                                {year}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <TextField
                        disabled={doneSubmit===""}
                        sx={{margin:2, width:270}}
                        id="outlined-address"
                        label="Address"
                        autoComplete="address"
                        value={`${address}`}
                        onChange={event => setAddress(event.target.value)}
                    />
                    <Typography sx={{display:(doneSubmit===false?"block":"none"),margin:2, width:270}} variant="caption" gutterBottom>
                        Sorry! Something went be wrong. Try again or wait a minute.
                    </Typography>
                    <Button
                        disabled={doneSubmit===""}
                        sx={{margin:2, width:270}}
                        variant="outlined"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </ChangeAccountInfo>
        </>
    );
}