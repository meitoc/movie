import { useContext } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ContextStatus } from '../../App';
import { ContextSearch } from '../../pages/Search';

export default function AdultSelect() {
    const {mobile,loginStatus,setShowLoginForm} = useContext(ContextStatus);
    const {setSelectAdult} = useContext(ContextSearch);
    const direction = mobile?"column": "row";

  return (
      <FormControl>
        <FormLabel id={`adult-${direction}-radio-buttons-group-label`}>Show 18+ movies</FormLabel>
        <RadioGroup
          row= {!mobile}
          aria-labelledby={`category-audult-radio-buttons-group-label`}
          name={`adult-${direction}-radio-buttons-group`}
          onChange={(event)=>{
            setSelectAdult(event.target.value);
          }}
          defaultValue={false}
        >
          <FormControlLabel disabled={loginStatus!==true} value={true} onClick={()=>{if(loginStatus!==true)setShowLoginForm(true)}} control={<Radio />} label="I'm 18+" />
          <FormControlLabel value={false} control={<Radio />} label="Don't show!" />
        </RadioGroup>
      </FormControl>
  );
}