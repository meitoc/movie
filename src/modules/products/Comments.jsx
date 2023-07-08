import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

export default function Comments(prop) {
    const reviews = prop.reviews;
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
    {reviews.map((item) =>{
        return(
        <Box key={item.id}>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={item.avatarUrl} />
            </ListItemAvatar>
            <ListItemText
            primary={item.name}
            secondary={
                <React.Fragment>
                <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    <Rating name="size-small" readOnly value={ Math.ceil(item.rating)} size="small" />
                    
                </Typography>
                {item.comment}
                </React.Fragment>
            }
            />
        </ListItem>
        <Divider variant="inset" component="li" />
        </Box>
        )
    })}
    </List>
  );
}