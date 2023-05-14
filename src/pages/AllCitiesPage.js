import {Link} from "react-router-dom";
import Navigation from "../components/Navigation";
import '../css/allcities.css';
import {useState} from "react";
function AllCitiesPage() {

    const token = localStorage.getItem('token');
    const [cities, setCities] = useState([]);

    fetch('http://localhost:8888/api/v1/cities', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            setCities(data);
        })
        .catch(error => console.error(error));

        const allCities = cities.map((city, index)=>
                <div key={city.cityId} className="card allcities-container">
                    <Link style={{fontSize:"30px", textDecoration:"none"}} to={`/cities/${city.name}`}><div  className="card-body"><img style={{opacity: "100%"}} className="topcities-img" height="100px" width="20%" src={city.imgPath}/> {city.name}</div></Link>
                    <p>{city.businessCount} business available</p>
                </div>
            );
    return(
        <>
            <Navigation/>
            <div className=" container mt-5">
                <h2 className="fw-bold">All cities</h2>
                <div className=" container mt-5">
                    <div style={{marginLeft:"150px"}} className="row justify-content-center mb-2 mt-3">
                        {allCities}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllCitiesPage;