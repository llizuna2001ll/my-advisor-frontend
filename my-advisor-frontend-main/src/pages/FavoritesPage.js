import Navigation from "../components/Navigation";
import {Chip, Grid, Rating} from "@mui/material";
import {useEffect, useState} from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';

import {Link} from "react-router-dom";
import axios from "axios";

function FavoritesPage() {
    const token = localStorage.getItem('token');
    const [businesses, setBusinesses] = useState([]);
    const accountUsername = localStorage.getItem("username");

    useEffect(() => {

        fetch('http://localhost:8888/api/v1/users/'+accountUsername+'/getFavorites', {
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
    }, []);



    function addFavorite(favoriteUsername, business) {
        document.getElementById(business).classList.add('business-unlike')
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
        <div key={business.accountId} className="business-container" id={business.accountId}>
            <Grid container>
                <div className="business-image w-25">
                    <img src={business.profileImgPath}/>
                </div>
                <div className="business-info w-75">
                    <Grid container>
                        <FavoriteIcon onClick={() => {
                            addFavorite(business.username, business.accountId)
                        }} sx={{cursor: "pointer"}} className="mt-1 me-2 text-danger heart-animation"/>
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
                    <img className="hero-img" src={'../images/profilePics/izuna-business.jpg'}/>
                    <h1 className="cityDescription">Favorites</h1>
                </div>
            </section>

            <div className="mt-2 mb-2">
                <Grid container>
                    <div className="w-100 businesses-wrapper">
                        {allBusinesses}
                    </div>
                </Grid>
            </div>
        </>
    );
}

export default FavoritesPage;