import {Link, useParams} from "react-router-dom";
import Navigation from "../components/Navigation";
import {Breadcrumbs, Grid, Skeleton, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import AddReview from "../components/AddReview";
import BusinessCard from "../components/BusinessCard";
import RatingPosts from "../components/RatingPosts";
import Comments from "../components/Comments";

function RatingPage() {
    let {reviewId} = useParams();
    let {business} = useParams();
    const token = localStorage.getItem("token");
    const [post, setPost] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8888/api/v1/posts/getFullPost/' + reviewId, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                setPost(data);
                console.log(data);
            })
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false));
    }, []);


    return (
        <>
            {
                isLoading ? (

                    <p>Loading</p>

                ) : (
                    <>
                        <Navigation/>
                        <section className="hero-section">
                            <div className="city-hero">
                                <img className="hero-img" src={'../../images/profilePics/' + business + '.jpg'}/>
                                <h1 className="cityDescription">{business}</h1>
                            </div>
                        </section>
                        <Breadcrumbs style={{marginLeft: "38%", marginTop: "20px"}} separator="›"
                                     aria-label="breadcrumb">
                            <Link to="/">Home</Link>
                            <Link to="/categories">Businesses</Link>
                            <Link to="/categories">{post.businessName}</Link>
                            <Link
                                style={{
                                    color: "black",
                                    textDecoration: "none",
                                    cursor: "default"
                                }}>post: "{post.postTitle}"</Link>
                        </Breadcrumbs>
                        <div className="mt-2 mb-2">
                            <Grid container>
                                <BusinessCard businessName={business}/>
                                <Comments postId ={post.postId}/>
                            </Grid>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default RatingPage;