import '../css/topcities.css';
import {Link, Route} from "react-router-dom";
import {useEffect, useState} from "react";
import {Chip} from "@mui/material";

function TopBusinesses() {

    const token = localStorage.getItem('token');
    const [topBusinesses, setTopBusinesses] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8888/api/v1/users/topBusinesses', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setTopBusinesses(data);
            })
            .catch(error => console.error(error));
    },[topBusinesses.length]);
    const businesses = topBusinesses.map((topBusiness, index) =>
        <div key={topBusiness.accountId} className="col-md-5 topcities-filter mb-2"><Link to={"/businesses/"+topBusiness.username}>
            <img className="topcities-img" height="250px" width="100%" src={`https://myadvisorbucket.s3.eu-north-1.amazonaws.com/${topBusiness.profileImgPath}`}/>
            <h2 className="upper-topcities-name">{topBusiness.username}</h2>
            <Chip className="top-business-rating" label={topBusiness.rating} color="success"/>
        </Link>
        </div>
    );

    return (
        <>
            <div className="container mt-5">
                <h2 className="fw-bold">Recommendations</h2>
                <div className="row justify-content-center mb-2 mt-3">
                    {businesses}
                </div>
                <Link to="/cities" className="container-fluid d-flex flex-row-reverse mt-2">Find more>></Link>
            </div>
        </>
    );
}

export default TopBusinesses;