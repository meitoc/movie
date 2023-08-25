import { useContext, useState, useEffect } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { ContextStatus } from '../../App';
import { ContextSearch } from '../../pages/Search';

export default function GenresSelect() {
    const {mobile} = useContext(ContextStatus);
    const {setSelectGenres} = useContext(ContextSearch);
    const direction = mobile?"column": "row";
    const [genres, setGenres]  = useState([]);
useEffect(()=>{
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      // Authorization: `Bearer ${token}`,
    }
  };
  fetch(`https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/genre/movie/list`, options)
    .then(response => response.json())
    .then(response => {
      setGenres(response.genres);
      console.log(`Response: Fetched genres`)
    })
    .catch(err => {
      console.log("Error when fetch a genres")
      console.error(err);
    });
},[setGenres])
  return (
    genres.length < 1 ? null:
      <FormControl>
        <FormLabel id={`category-${direction}-radio-buttons-group-label`}>Category</FormLabel>
        <RadioGroup
          row= {!mobile}
          aria-labelledby={`category-${direction}-radio-buttons-group-label`}
          name={`category-${direction}-radio-buttons-group`}
          onChange={(event)=>{setSelectGenres(event.target.value)}}
          defaultValue={0}
        >
          
            <FormControlLabel value={0} control={<Radio />} label="All" />
            {genres.map((item)=>(
              <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.name} />
              ))}
        </RadioGroup>
      </FormControl>
  );
}