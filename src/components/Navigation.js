import '../css/navbar.css';
import {Link} from "react-router-dom";

function Navigation() {

    return (
        <nav style={{color:"white"}} className="navbar navbar-expand-sm navigation-container navbar-light text-center">
            <div className="nav-logo">
                <h3>MyAdvisor.com</h3>
            </div>
            <ul style={{color:"white",marginTop:"5px",marginLeft:"22%"}} className="navbar-nav me-auto mb-2 mb-lg-0">
                <li  className="nav-item">
                    <Link style={{color:"white"}} className="nav-link navitem" to="/cities">Cities</Link>
                </li>

                <li className="nav-item">
                    <Link style={{color:"white"}} className="nav-link navitem" to="/businesses">Businesses</Link>
                </li>

                <li className="nav-item">
                    <Link style={{color:"white"}} className="nav-link navitem" to="/categories">Categories</Link>
                </li>
            </ul>
            <div className="container-fluid d-flex flex-row-reverse">
                <a className="navbar-brand">
                    <img src="../images/img_avatar1.png" alt="Avatar Logo" width="40px" className="rounded-pill"/>
                </a>
            </div>
        </nav>
    );
}

export default Navigation;