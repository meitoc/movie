import Switch from '@mui/material/Switch';
import { useContext } from 'react';
import { ContextStatus } from '../App';
export function Setting() {
    const {darkMode, setDarkMode} = useContext(ContextStatus);
    return (<>
    <p>SETTING DARK MODE</p>
    <Switch
            checked={darkMode}
            onChange={() => {
                localStorage.setItem('darkMode', (!(darkMode===true))?"true":"false");
                setDarkMode(!(darkMode===true));
            }}
            name="darkMode" 
            color="primary"
          />
    </>);
}