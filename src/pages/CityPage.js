import {Link, useNavigate, useParams} from "react-router-dom";
import Navigation from "../components/Navigation";
import '../css/cityPage.css';
import FilterBar from "../components/FilterBar";
import {useEffect, useState} from "react";
import {Chip, Grid, Rating} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function CityPage() {
    const token = localStorage.getItem('token');
    let {city} = useParams();
    city = city.charAt(0).toUpperCase() + city.slice(1);
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8888/api/v1/users/findBusinessByCity/' + city, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                setBusinesses(data);
                console.log(businesses);
            })
            .catch(error => console.error(error));
    }, [city]);

    const showFilter = (rating, businessTypes) => {
        fetch('http://localhost:8888/api/v1/users/filterBusiness?rating=' + rating + '&businessTypes=' + businessTypes + '&city=' + city, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                setBusinesses(data)
                console.log(businesses);
            })
            .catch(error => console.error(error));

    };
    const allBusinesses = businesses.map((business, index)=>
        <div key={business.accountId} className="business-container">
            <Grid container>
                <div className="business-image w-25">
                    <img src={business.profileImgPath}/>
                </div>
                <div className="business-info w-75">
                    <Grid container>
                        <FavoriteBorderIcon className="mt-1 me-2"/>
                        <h3 className="business-name">{business.username}</h3>
                        <Rating className="mt-1 ms-1" name="read-only" value={business.rating} precision={0.5}
                                readOnly/>
                        <Chip className="rating-value" label={business.rating} color="primary"/>
                    </Grid>
                    <Grid>
                        <Link className="business-type" to={"/businessTypes/"+business.businessType}>Type: {business.businessType}</Link>
                        <Link className="business-city ms-3" to={"/cities/"+business.city.toLowerCase()}>City: {business.city}</Link>
                    </Grid>
                    <p className="business-description mt-3 pe-3">{business.businessDescription}</p>
                    <Link className="see-more-abt-business" to="/businessPage">Check it</Link>
                </div>
            </Grid>
        </div>

    );
    return (
        <>
            <Navigation/>
            <section className="hero-section">
                <div className="city-hero">
                    <img className="hero-img" src={'../images/cities/' + city.toLowerCase() + '.jpg'}/>
                    <h1 className="cityDescription">{city}</h1>
                </div>
            </section>
            <div className="mt-2">
                <Grid container>
                    <FilterBar isSelectActive={false} filterValues={showFilter}/>
                    <div className="w-75 businesses-wrapper">
                        {allBusinesses}
                    </div>
                </Grid>
            </div>
        </>

    );
}

export default CityPage;