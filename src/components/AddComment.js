import {Accordion, AccordionDetails, AccordionSummary, Alert, Collapse, Grid} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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
            <Accordion style={{boxShadow: "none", border: "none"}}>
                <Grid className="ms-2 mt-2" container>
                    {liked ? (
                        <FavoriteIcon
                            onClick={likePost}
                            style={{cursor: 'pointer', marginTop: '10px'}}
                            id="likeIcon"
                            className="text-danger heart-animation"
                            fontSize="large"
                        />
                    ) : (
                        <FavoriteBorderIcon
                            onClick={likePost}
                            style={{cursor: 'pointer', marginTop: '10px'}}
                            className="text-danger heart-animation"
                            id="likeIcon"
                            fontSize="large"
                        />
                    )}
                    <p className=" ms-3 mt-3 text-muted">{props.likesCount} likes</p>
                    <AccordionSummary style={{width: "50px", boxShadow: "none", transform: "translateX(800px)"}}
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                    >
                        <AddCommentIcon  className="text-primary heart-animation" fontSize="large"/>
                    </AccordionSummary>
                </Grid>
                <AccordionDetails>
                    <Grid className="w-100" container>
                        <img style={{borderRadius: "0", width: "100px", height: "100px"}}
                             className="post-profile-pic shadow-1-strong mt-2"
                             src={localStorage.getItem("profileImg") + ".jpg"} alt="profile-img"/>

                        <textarea placeholder="Reply..." className="form-control w-75 border mt-2"
                                  style={{borderRadius: "0", height: "100px"}} id="exampleFormControlTextarea1"
                                  rows="3"
                                  value={commentText}
                                  onChange={(e) => setCommentText(e.target.value)}></textarea>
                        <div onClick={() => {
                            addComment(props.postId);
                        }} style={{marginTop: "8px", borderRadius: "0"}} className="btn btn-primary"><p
                            className="mt-4">Submit</p></div>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default AddComment;