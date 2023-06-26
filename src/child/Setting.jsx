import Switch from '@mui/material/Switch';
import { useContext } from 'react';
import { ContextDarkMode } from '../Layout';
export function Setting() {
    const {darkMode, setDarkMode} = useContext(ContextDarkMode);
    return (<>
    <p>SETTING DARK MODE</p>
    <Switch
            checked={darkMode}
            onChange={() => {
                localStorage.setItem('darkMode', !darkMode);
                setDarkMode(!darkMode);
            }}
            name="darkMode" 
            color="primary"
          />
    </>);
}