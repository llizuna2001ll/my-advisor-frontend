import Navigation from "../components/Navigation";
import FilterBar from "../components/FilterBar";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Breadcrumbs, Chip, Grid, Rating} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";

function AllBusinesses() {
    const token = localStorage.getItem('token');
    const [businesses, setBusinesses] = useState([]);
    const accountUsername = localStorage.getItem("username");
    const [fav, setFav] = useState(1)
    useEffect(() => {

        fetch('http://localhost:8888/api/v1/users/businesses', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                setBusinesses(data);
            })
            .catch(error => console.error(error));
    }, [fav]);


    const showFilter = (rating, businessTypes, selectedCity) => {
        fetch('http://localhost:8888/api/v1/users/filterBusiness?rating=' + rating + '&businessTypes=' + businessTypes + '&city=' + selectedCity, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                setBusinesses(data)
            })
            .catch(error => console.error(error));

    };

    function addFavorite(favoriteUsername) {
        setFav(fav+1);
        const url = 'http://localhost:8888/api/v1/users/addFavorite';
        const data = {accountUsername, favoriteUsername};
        console.log("LOL"+accountUsername+" "+favoriteUsername);
        axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
            })
            .catch(error => {
            });
    }

    const allBusinesses = businesses.map((business, index) =>
        <div key={business.accountId} className="business-container">
            <Grid container>
                <div className="business-image w-25">
                    <img src={business.profileImgPath}/>
                </div>
                <div className="business-info w-75">
                    <Grid container>
                        {business.fans.includes(accountUsername) ? (
                                <FavoriteIcon onClick={() => {
                                    addFavorite(business.username)
                                }} sx={{cursor: "pointer"}} className="mt-1 me-2 text-danger heart-animation"/>
                            )
                            :
                            (
                                <FavoriteBorderIcon onClick={() => {
                                    addFavorite(business.username)
                                }} sx={{cursor: "pointer"}} className="mt-1 me-2 heart-animation"/>
                            )
                        }
                        <h3 className="business-name">{business.username}</h3>
                        <Rating className="mt-1 ms-1" name="read-only" value={business.rating} precision={0.5}
                                readOnly/>
                        <Chip className="rating-value" label={business.rating} color="primary"/>
                    </Grid>
                    <Grid>
                        <Link className="business-type"
                              to={"/categories/" + business.businessType.toLowerCase()}>Type: {business.businessType}</Link>
                        <Link className="business-city ms-3"
                              to={"/cities/" + business.city.toLowerCase()}>City: {business.city}</Link>
                    </Grid>
                    <p className="business-description mt-3 pe-3">{business.businessDescription}</p>
                    <Link className="see-more-abt-business" to={"/businesses/" + business.username}>Check it</Link>
                </div>
            </Grid>
        </div>
    );

    return (
        <>
            <Navigation/>
            <section className="hero-section">
                <div className="city-hero">
                    <img className="hero-img" src={'../images/cover-pic.jpg'}/>
                    <h1 className="cityDescription">All Businesses</h1>
                </div>
            </section>
            <Breadcrumbs style={{marginLeft: "45%", marginTop: "20px"}} separator="›" aria-label="breadcrumb">
                <Link to="/">Home</Link>
                <Link style={{color: "black", textDecoration: "none", cursor: "default"}}>Businesses</Link>
            </Breadcrumbs>
            <div className="mt-2 mb-2">
                <Grid container>
                    <FilterBar isSelectActive={true} filterValues={showFilter}/>
                    <div className="w-75 businesses-wrapper">
                        {allBusinesses}
                    </div>
                </Grid>
            </div>
        </>
    );
}

export default AllBusinesses;