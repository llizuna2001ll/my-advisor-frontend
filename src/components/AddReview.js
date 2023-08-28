import {useState} from "react";
import {Alert, Button, Collapse, Input, Rating} from "@mui/material";
import {Modal} from "react-bootstrap";
import axios from "axios";

function
AddReview(props) {
    const [show, setShow] = useState(false);
    const [rating, setRating] = useState(0);
    const [ratingDescription, setRatingDescription] = useState('');
    const [ratingTitle, setRatingTitle] = useState('');
    const [openCommentError, setOpenCommentError] = useState(false);
    const [openCommentSuccess, setOpenCommentSuccess] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function submitRating() {
        if (ratingTitle !== "" && ratingDescription !== "" && rating !== 0) {
            const postTitle = ratingTitle;
            const postDescription = ratingDescription;
            const postRating = rating;
            const accountUsername = localStorage.getItem("username");
            const businessName = props.businessName;
            const jwtToken = localStorage.getItem('token');
            setOpenCommentError(false);
            const url = 'http://localhost:8888/api/v1/posts/addPost';
            const data = {postTitle, postDescription, postRating, accountUsername, businessName};
            axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            })
                .then(response => {
                    setOpenCommentSuccess(true);
                    setRatingDescription('');
                    setRatingTitle('');
                    setRating(0);
                })
                .catch(error => {
                })
                .finally(() => {
                    axios.post('http://localhost:8888/api/v1/users/changeRating?rating=' + postRating + '&businessName=' + businessName,null, {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`
                        }
                    })
                        .then(response => {

                            }
                        )
                });
        } else {
            setOpenCommentError(true);
        }
    }

    return (
        <>

            <Button onClick={handleShow} className="add-review-button" variant="contained">Add Review</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Rating</Modal.Title>
                </Modal.Header>
                <Collapse in={openCommentError}>
                    <Alert severity="error"
                           action={
                               <div onClick={() => {
                                   setOpenCommentError(false);
                               }} color="inherit" size="small" className="fw-bolder mt-1" style={{cursor: "pointer"}}>
                                   UNDO
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
                                   UNDO
                               </div>
                           }
                    >
                        Reply Submitted Successfully!
                    </Alert>
                </Collapse>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label fw-bolder">Title</label>
                            <input type="text" className="form-control" id="title"
                                   placeholder="Rating Title..." value={ratingTitle}
                                   onChange={(e) => setRatingTitle(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Description" className="form-label fw-bolder">Description</label>
                            <textarea placeholder="Rating Descrition..." className="form-control" id="Description"
                                      rows="3" value={ratingDescription}
                                      onChange={(e) => setRatingDescription(e.target.value)}></textarea>
                        </div>
                        <div className="mb-3">
                            <p className="form-label fw-bolder">Rating</p>
                            <Rating
                                size="large"
                                name="simple-controlled"
                                precision={0.5}
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className="bg-primary text-white" onClick={submitRating}>
                        Submit Rating
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddReview;