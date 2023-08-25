import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import { ContextStatus } from '../../App';
import addUserData from '../../features/fetch-data/addUserData';
import fetchComment from '../../features/fetch-data/fetchComment';



export default function Comment(prop) {
    const {mobile,loginStatus,setShowLoginForm,userData} =React.useContext(ContextStatus);
    const [aComment,setAComment]=React.useState("");
    const [disableEnter,setDisableEnter]=React.useState(false);
    React.useEffect( ()=>{
        fetchComment(prop.movie)
        .then(result => {
            console.log("Comment:");
            console.log(result);
            if (result !== undefined && result !== null) {
                setCommentList(result);
            }
        })
        .catch(error => {
            console.error(error);
        });
    },[prop.movie])
    const [commentList,setCommentList]=React.useState({id: prop.movie, total: 0, comments:[]});//test
    const addAComment = async ()=>{
        if(loginStatus!==true){
            setShowLoginForm(true);
        }
        else{
            const processedComment=aComment.replace(/^\n+|\n+$/g, "")
            if(prop.movie!==null && prop.movie!==undefined && processedComment!=""){
                setDisableEnter(true);
                const result = await addUserData(`${prop.movie}`,processedComment ,"comment");
                if(result.status===true) {
                    console.log(userData);//test
                    const newCommentList=commentList;
                    const index = newCommentList.comments.findIndex(comment => comment.id === userData.id);
                    if (index === -1) {
                        const newComment = {
                            id:  userData.id,
                            name: userData.realname??`*user-${userData.id}`,
                            image: null,
                            time: "just now",
                            comment: processedComment
                        };
                        newCommentList.comments.push(newComment);
                    }else {
                        newCommentList.comments[index].comment = processedComment;
                        newCommentList.comments[index].time = "just now";
                    }
                    setCommentList(newCommentList);
                    setAComment("");
                    setDisableEnter(false);
                } else if(result.status===false){
                    setDisableEnter(false);
                }
            }
        }
    }
    if(commentList!=undefined)
    return (
        <>
            <List sx={{ width: '100%'}}>
                {commentList.comments.map((item,i)=> {
                    return(
                        <>
                            <ListItem key={i} alignItems="flex-start">
                                <ListItemAvatar>
                                <Avatar alt={item.name} src="/static/images/avatar/2.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                primary={item.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            {item.time}
                                        </Typography>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            <div style={{maxWidth:mobile?"60vw":"80vw",overflowWrap : "break-word", whiteSpace: "pre-wrap"}}>
                                                {item.comment}
                                            </div>
                                        </Typography>
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </>
                    )
                })}
            </List>
            <TextField fullWidth
                disabled={disableEnter}
                label="Add new or change old comment"
                id="outlined-textarea"
                value={aComment}
                multiline
                onChange={(event)=>{
                    setAComment(event.target.value)
                }}
                onKeyUp={(event)=>{
                    if ((event.key === "Enter" || event.key === "Done") && !event.shiftKey){
                        addAComment();
                    }
                }}
            />
            <Button
                disabled={disableEnter}
                variant="outlined"
                sx={{marginTop:2,marginBottom:2, width:"100%"}}
                onClick={
                    addAComment
                }
            >
                Submit comment
            </Button>
        </>
    );
    else return (<CircularProgress />);
}