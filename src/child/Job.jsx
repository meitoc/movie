// import * as React from 'react';
// import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { ContextDarkMode } from '../Layout';
export default function ViewJob(data) {
    const {darkMode}=useContext(ContextDarkMode);
  return (
    <Card sx={{backgroundColor: darkMode ? 'rgb(150,150,150)' : 'rgb(210,210,255)'}}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {data.job.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="h5">
          ${data.job.salaryLow.toLocaleString()} UPTO
        </Typography>
        <Typography gutterBottom variant="h4" component="h4">
          ${data.job.salaryHigh.toLocaleString()}
        </Typography>
        <Typography gutterBottom variant="h6" component="h6">
          {data.job.remote?'REMOTE':'onsite'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Years of experience: {data.job.yrsXPExpected}
          <br></br>
          Skills required: {data.job.skills.map((e,i)=>((i+1)<data.job.skills.length?` ${e},`:` ${e}`))}
          <br></br>
          Description: {data.job.description}
          <br></br>
          Location: {data.job.city}
          <br></br>
          Posted at: {data.job.postedDate.slice(0,10)} {data.job.postedDate.slice(11,19)} 
        </Typography>
      </CardContent>
      <CardActions>
        {data.job.active?<Button size="big" sx={{backgroundColor:'rgb(255,255,255)', color:'rgb(50,50,100)'}}>Apply Now</Button>:""}
        <Button size="big" sx={{backgroundColor:'rgb(255,255,255)', color:'rgb(50,50,100)'}}>About the Employer</Button>
      </CardActions>
    </Card>
  );
}