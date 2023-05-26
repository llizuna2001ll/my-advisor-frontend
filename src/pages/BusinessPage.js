import Navigation from "../components/Navigation";
import {Link, useParams} from "react-router-dom";
import {Breadcrumbs, Grid, Stack} from "@mui/material";
import '../css/businessPage.css';
import FilterBar from "../components/FilterBar";
import BusinessCard from "../components/BusinessCard";
import RatingPosts from "../components/RatingPosts";

function BusinessPage() {
    const token = localStorage.getItem('token');
    let {business} = useParams();

    return (
        <>
            <Navigation/>
            <section className="hero-section">
                <div className="city-hero">
                    <img className="hero-img" src={'../images/profilePics/' + business + '.jpg'}/>
                    <h1 className="cityDescription">{business}</h1>
                </div>
            </section>
            <Breadcrumbs style={{marginLeft: "38%", marginTop: "20px"}} separator="›" aria-label="breadcrumb">
                <Link to="/">Home</Link>
                <Link to="/categories">Businesses</Link>
                <Link style={{color: "black", textDecoration: "none", cursor: "default"}}>{business}</Link>
            </Breadcrumbs>
            <div className="mt-2 mb-2">
                <Grid container>
                    <BusinessCard businessName={business}/>
                    <RatingPosts businessName={business}/>
                </Grid>
            </div>
        </>
    );
}

export default BusinessPage;