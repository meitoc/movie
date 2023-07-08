import { useContext } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { ContextStatus } from '../../App';

export default function SortForm() {
    const {setSortBy} = useContext(ContextStatus);
    return(
        <FormControl sx={{ xl: 4, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={(event)=>setSortBy(event.target.value)}
          autoWidth
          label="Sort"
          defaultValue="recommend"
        >
            <MenuItem value={"recommend"}>Recommend</MenuItem>
            <MenuItem value={"priceup"}>Price up</MenuItem>
            <MenuItem value={"pricedown"}>Price down</MenuItem>
            <MenuItem value={"rateup"}>Rate up</MenuItem>
            <MenuItem value={"ratedown"}>Rate down</MenuItem>
        </Select>
      </FormControl>
    )
}