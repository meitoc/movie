import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { ContextStatus } from '../App';

export function Setting() {
    const {darkMode, setDarkMode} = useContext(ContextStatus);
    return (<>
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexWrap: 'wrap',
            '& > :not(style)': {
            m: 1,
            width: '90vw',
            padding: 2
            },
        }}
    >
        <Paper elevation={2}>
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
            </Paper>
        </Box>
    </>);
}