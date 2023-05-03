import '../css/topcities.css';
import {Link, Route} from "react-router-dom";

function TopCities() {
    return (
        <>
            <div className="container mt-4">
                <h2 className="fw-bold">Top cities</h2>
                <div className="row justify-content-center mb-2 mt-3">
                    <div className="col-md-5 topcities-filter"><Link to="/cities/marrakesh">
                        <img className="topcities-img" height="250px" width="100%" src="./images/cities/kech.jpg"/>
                        <h2 className="upper-topcities-name">Marrakesh</h2></Link>
                    </div>
                    <div className="col-md-5 topcities-filter"><Link to="/cities/tangier">
                        <img className="topcities-img" height="250px" width="100%" src="./images/cities/tangier.jpg"/>
                        <h2 className="upper-topcities-name">Tangier</h2></Link>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-5 topcities-filter"><Link to="/cities/casablanca">
                        <img className="topcities-img" height="250px" width="100%" src="./images/cities/casablanca.jpg"/>
                        <h2 className="upper-topcities-name">Casablanca</h2></Link>
                    </div>
                    <div className="col-md-5 topcities-filter"><Link to="/cities/fez">
                        <img className="topcities-img" height="250px" width="100%" src="./images/cities/fes.jpg"/>
                        <h2 className="upper-topcities-name">Fez</h2></Link>
                    </div>
                </div>
                <Link to="/cities" className="container-fluid d-flex flex-row-reverse mt-2">All cities >></Link>
            </div>
        </>
    );
}

export default TopCities;