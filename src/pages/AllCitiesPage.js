import {Link} from "react-router-dom";
import Navigation from "../components/Navigation";
import '../css/allcities.css';
function AllCitiesPage() {
    return(
        <>
            <Navigation/>
            <div className=" container mt-5">
                <h2 className="fw-bold">All cities</h2>
                <div style={{marginLeft:"150px"}} className="row justify-content-center mb-2 mt-3">
                    <div className="card allcities-container">
                        <Link style={{fontSize:"30px", textDecoration:"none"}} to="/cities/marrakesh"><div  className="card-body"><img style={{opacity: "100%"}} className="topcities-img" height="100px" width="20%" src="./images/cities/kech.jpg"/> Marakkesh</div></Link>
                    </div>
                    <div  className="card allcities-container">
                        <Link style={{fontSize:"30px", textDecoration:"none"}} to="/cities/casablanca"><div style={{fontSize:"30px"}} className="card-body"><img style={{opacity: "100%"}} className="topcities-img" height="100px" width="20%" src="./images/cities/casablanca.jpg"/> Casablanca</div></Link>
                    </div>
                    <div  className="card allcities-container">
                        <Link style={{fontSize:"30px", textDecoration:"none"}} to="/cities/tangier"><div style={{fontSize:"30px"}} className="card-body"><img style={{opacity: "100%"}} className="topcities-img" height="100px" width="20%" src="./images/cities/tangier.jpg"/> Tangier</div></Link>
                    </div>
                    <div  className="card allcities-container">
                        <Link style={{fontSize:"30px", textDecoration:"none"}} to="/cities/fes"><div style={{fontSize:"30px"}} className="card-body"><img style={{opacity: "100%"}} className="topcities-img" height="100px" width="20%" src="./images/cities/fes.jpg"/> Fez</div></Link>
                    </div>
                    <div  className="card allcities-container">
                        <Link style={{fontSize:"30px", textDecoration:"none"}} to="/cities/agadir"><div style={{fontSize:"30px"}} className="card-body"><img style={{opacity: "100%"}} className="topcities-img" height="100px" width="20%" src="./images/cities/agadir.jpg"/> Agadir</div></Link>
                    </div>
                    <div className="card allcities-container">
                        <Link style={{fontSize:"30px", textDecoration:"none"}} to="/cities/marrakesh"><div style={{fontSize:"30px"}} className="card-body"><img style={{opacity: "100%"}} className="topcities-img" height="100px" width="20%" src="./images/cities/kech.jpg"/> Agadir</div></Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllCitiesPage;