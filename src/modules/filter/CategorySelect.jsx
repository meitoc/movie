import { useContext } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { ContextStatus } from '../../App';


export default function CategorySelect() {
    const {mobile, setSelectCategory} = useContext(ContextStatus);
    const direction = mobile?"column": "row";
  return (
    <FormControl>
      <FormLabel id={`category-${direction}-radio-buttons-group-label`}>Category</FormLabel>
      <RadioGroup
        row= {!mobile}
        aria-labelledby={`category-${direction}-radio-buttons-group-label`}
        name={`category-${direction}-radio-buttons-group`}
        onChange={(event)=>{setSelectCategory(event.target.value)}}
        defaultValue=""
      >
        <FormControlLabel value="" control={<Radio />} label="All" />
        <FormControlLabel value="Shose" control={<Radio />} label="Shose" />
        <FormControlLabel value="Apparel" control={<Radio />} label="Apparel" />
        <FormControlLabel value="Accessories" control={<Radio />} label="Accessories" />
      </RadioGroup>
    </FormControl>
  );
}