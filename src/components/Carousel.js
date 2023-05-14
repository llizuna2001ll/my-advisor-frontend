import {useState} from "react";
import {Link} from "react-router-dom";

function Carousel() {

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
            setCities(data.slice(0, 3));
        })
        .catch(error => console.error(error));

    const carouselItems = cities.map((city, index) =>
        <div key={city.cityId} className="carousel-item active">
            <Link to={"/cities/" + city.name}>
                <div style={{height:"100%",width:"100%",backgroundColor:"black",borderRadius:"10px"}}>
                <img style={{opacity:"80%"}} src={city.imgPath} className="d-block w-100" alt={city.name}/>
                </div>
                <div className="carousel-caption d-none d-md-block">
                    <h5>{city.name}</h5>
                </div>
            </Link>
        </div>
    );
    return (
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"
                        aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                {carouselItems}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;