import { useState, useEffect, useContext } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import { allJobs } from '../data/jobs';
import {Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ViewJob from './Job';
import { ContextStatus } from '../App';
import Login from './Login';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgb(10,100,100)' : 'rgb(210,210,255)',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  elevation: 3,
}));
export default function ListJobs() {
  const {loginStatus} = useContext(ContextStatus);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchJobs = async() => {
      try{
        // const url = 'https://docs.coderschool.vn/assets/web-virgil/data/jobs.json';
        // const response = await fetch(url);
        // const data = await response.json();
        const data = await Object.values(allJobs);
        setJobs(data);
      }
      catch (error){
        setJobs([]);
        console.log(error);
      }
    };

    fetchJobs();
  }, []);
  //  console.log(jobs);//test
  const handleChange = (event, value) => {
    setPage(value);
  };
  const { jobId } = useParams();
  const viewJob = jobs.find((item)=>item.id===jobId);

  if(jobId===undefined)  return(
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }} >
          {jobs.map((job, index) => (
            index>=((page-1)*5) && index<(page*5)?(
              <Grid item xs={2} sm={4} md={4} key={index} >
                <Link to={`jobs/${job.id}`} style={{textDecoration: "none"}}>
                  <Item>
                    <h3>{job.title}</h3>
                    <div>
                      Skills: {job.skills.map((e,index)=>(index<4?(index===(job.skills.length-1)? e: `${e}, `):""))}
                    </div>
                    <p>{job.description}</p>
                  </Item>
                </Link>
              </Grid>
            )
            :
            ""
          ))}
        </Grid>
      </Box>
      <Pagination count={Math.ceil(jobs.length / 5)} color="primary"  style={{ margin: "20px" }} page={page}  onChange={handleChange} />
    </Box>
  );
  if (loginStatus) return(
  <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>    
    <Box sx={{ flexGrow: 1 }}>
      <Grid container
        spacing={2}
        columns={1}
      >
      <Grid item xs={2} sm={4} md={4}>
          {viewJob===undefined?
          <p>...</p>
          :
          <ViewJob job={viewJob} />
          }
        </Grid>
      </Grid>
    </Box>
  </Box>
  );
  else return (<Login />)
}