import {Accordion, AccordionDetails, AccordionSummary, Alert, Collapse, Grid} from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AddCommentIcon from "@mui/icons-material/AddComment";
import {useEffect, useState} from "react";
import axios from "axios";

function AddComment(props) {
    const [commentText, setCommentText] = useState("");
    const [openCommentError, setOpenCommentError] = useState(false);
    const [openCommentSuccess, setOpenCommentSuccess] = useState(false);
    const accountUsername = localStorage.getItem("username");
    const jwtToken = localStorage.getItem('token');
    const [liked, setLiked] = useState(null);

    useEffect(() => {
        if (props.isLiked) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [props.isLiked]);

    function addComment(postId) {
        if (commentText !== "") {
            setOpenCommentError(false);
            const url = 'http://localhost:8888/api/v1/comments/addComment';
            const data = {commentText, accountUsername, postId};
            axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            })
                .then(response => {
                    setOpenCommentSuccess(true);
                    setCommentText('');
                })
                .catch(error => {
                });
        } else {
            setOpenCommentError(true);
        }
    }

    function likePost() {
        const postId = props.postId;
        const username = accountUsername;
        axios.post('http://localhost:8888/api/v1/posts/likePost', {postId, username}, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then(response => {

                }
            )
            .catch(error => {
            })
            .finally(() => {
                axios.post('http://localhost:8888/api/v1/users/likePost', {postId, username}, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                })
                    .then(response => {

                        }
                    )
                    .catch(error => {

                    })
            })
    }

    return (
        <>
            <Collapse in={openCommentError}>
                <Alert severity="error"
                       action={
                           <div onClick={() => {
                               setOpenCommentError(false);
                           }} color="inherit" size="small" className="fw-bolder mt-1" style={{cursor: "pointer"}}>
                               X
                           </div>
                       }
                >
                    Write a reply before submiting!
                </Alert>
            </Collapse>
            <Collapse in={openCommentSuccess}>
                <Alert severity="success"
                       action={
                           <div onClick={() => {
                               setOpenCommentSuccess(false);
                           }} color="inherit" size="small" className="fw-bolder mt-1" style={{cursor: "pointer"}}>
                               X
                           </div>
                       }
                >
                    Reply Submitted Successfully!
                </Alert>
            </Collapse>
                <Grid className="ms-2 mt-2" container>
                    {liked ? (
                        <ThumbUpAltIcon
                            onClick={likePost}
                            style={{cursor: 'pointer', marginTop: '10px'}}
                            id="likeIcon"
                            className="text-primary heart-animation"
                            fontSize="large"
                        />
                    ) : (
                        <ThumbUpOffAltIcon
                            onClick={likePost}
                            style={{cursor: 'pointer', marginTop: '10px'}}
                            className="text-primary heart-animation"
                            id="likeIcon"
                            fontSize="large"
                        />
                    )}
                    <p style={{marginTop: '19px'}} className=" ms-1  text-muted">{props.likesCount}</p>
                </Grid>
        </>
    );
}

export default AddComment;