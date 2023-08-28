import {
    Grid,
    Rating, Skeleton,
    Stack
} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddReview from "./AddReview";
import AddComment from "./AddComment";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

function RatingPosts(props) {
    const token = localStorage.getItem("token");
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8888/api/v1/posts/byBusinessName/' + props.businessName, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                setPosts(data);
            })
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false));
    }, [posts, token, props.businessName]);

    const allPosts = posts.map((post) =>
        <div key={post.postId} className="post card">
            <div className="card-body">
                <Grid className="mt-2" container>
                    <img className="post-profile-pic shadow-1-strong" src={post.user.profileImgPath + ".jpg"} alt="profile-img"/>
                    <Stack>
                        <p className="fw-bolder ms-2 mt-1 text-primary">{post.accountUsername}</p>
                        <p style={{marginTop: "-15px"}} className="ms-2 text-muted small"> {new Date(post.postDate).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}</p>
                    </Stack>
                    {/*<MoreHorizIcon style={{marginLeft: "700px"}} className="mt-3"/>*/}
                </Grid>
                <Stack className="mt-3">
                    <Grid className="ms-2" container>
                        <Link to={"/businesses/"+props.businessName+"/"+post.postId} style={{textDecoration: "none"}}><h4 className="">{post.postTitle}</h4>
                        </Link>
                        <Rating className="ms-2 mt-1" name="read-only" style={post.postRating >= 4 ? {color: "#2E7D32"} : post.postRating >= 3 && post.postRating < 4 ? {color: "#ED6C02"} : {color:"#D32F2F"} }
                                value={post.postRating} precision={0.5}
                                readOnly/>
                    </Grid>
                    <p className="post-description">{post.postDescription}</p>
                </Stack>
            </div>
            <AddComment postId={post.postId} isLiked={post.likes.find(like => like.username === localStorage.getItem("username"))}
                        likesCount={post.likes.length}/>
        </div>
    );

    return (
        <>
            <div className="posts-container">
                <Stack>
                    <AddReview businessName={props.businessName}/>

                    <div className="posts d-flex flex-column-reverse justify-content-center">
                        {isLoading ? (
                            <>
                                <Stack style={{marginBottom:"50px"}}>
                                    <Grid container>
                                        <Skeleton style={{marginLeft: "30px", marginTop: "23px"}} variant="circular"
                                                  width={70} height={70}/>
                                        <Skeleton style={{marginLeft: "5px", marginTop: "28px"}} variant="text"
                                                  width={120} height={20}/>
                                    </Grid>
                                    <Skeleton style={{marginLeft: "45px", marginTop: "20px"}} variant="text"
                                              width={410}/>
                                    <Skeleton style={{marginLeft: "45px", marginTop: "10px"}} variant="text"
                                              width={910}/>
                                    <Skeleton style={{marginLeft: "45px"}} variant="text"
                                              width={410}/>
                                    <Grid container>
                                        <Skeleton style={{marginLeft: "45px", marginTop: "50px"}} variant="circular"
                                                  width={40} height={40}/>
                                        <Skeleton style={{marginLeft: "30px", marginTop: "60px"}} variant="text"
                                                  width={90} height={20}/>
                                    </Grid>
                                </Stack>

                                <Stack style={{marginBottom:"50px"}}>
                                    <Grid container>
                                        <Skeleton style={{marginLeft: "30px", marginTop: "23px"}} variant="circular"
                                                  width={70} height={70}/>
                                        <Skeleton style={{marginLeft: "5px", marginTop: "28px"}} variant="text"
                                                  width={120} height={20}/>
                                    </Grid>
                                    <Skeleton style={{marginLeft: "45px", marginTop: "20px"}} variant="text"
                                              width={410}/>
                                    <Skeleton style={{marginLeft: "45px", marginTop: "10px"}} variant="text"
                                              width={910}/>
                                    <Skeleton style={{marginLeft: "45px"}} variant="text"
                                              width={410}/>
                                    <Grid container>
                                        <Skeleton style={{marginLeft: "45px", marginTop: "50px"}} variant="circular"
                                                  width={40} height={40}/>
                                        <Skeleton style={{marginLeft: "30px", marginTop: "60px"}} variant="text"
                                                  width={90} height={20}/>
                                    </Grid>
                                </Stack>
                            </>
                        ) : (
                            allPosts
                        )}
                    </div>
                </Stack>
            </div>
        </>
    );
}

export default RatingPosts;