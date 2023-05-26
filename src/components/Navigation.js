import '../css/navbar.css';
import {Link} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import {Tooltip} from "@mui/material";

function Navigation() {
    const username = localStorage.getItem('username');

    return (
        <>
            <nav style={{color: "white"}}
                 className="navbar navbar-expand-sm navigation-container navbar-light text-center">
                <div className="nav-logo">
                    <Link style={{color: "white", textDecoration: "none"}} to="/"><h3>MyAdvisor.com</h3></Link>
                </div>
                <ul style={{marginTop: "5px", marginLeft: "22%"}} className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link navitem" to="/cities">Cities</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link navitem" to="/businesses">Businesses</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link navitem" to="/categories">Categories</Link>
                    </li>
                </ul>

                <ul className="dropdown d-flex flex-row mt-3">
                    <li><Link to=""><Tooltip  disableFocusListener  title="Notifications"><NotificationsIcon className=" navitem" fontSize="medium"/></Tooltip></Link></li>
                    <li><Link to="/messages"><Tooltip  disableFocusListener  title="Messages"><ChatIcon className=" navitem" fontSize="medium"/></Tooltip></Link></li>
                    <li><Link to="/favorites"><Tooltip  disableFocusListener  title="Favorites"><FavoriteIcon className=" navitem" fontSize="medium"/></Tooltip></Link></li>
                    <li><Link to=""><Tooltip  disableFocusListener  title="Account"><PersonIcon className=" navitem" fontSize="medium"/></Tooltip></Link></li>
                    <li><Link to="/auth" onClick={() => {
                        localStorage.clear()
                    }} className="dropdown-item"><Tooltip  disableFocusListener  title="Logout"><LogoutIcon className=" navitem" fontSize="medium"/></Tooltip></Link></li>
                </ul>

                <div className="container-fluid d-flex flex-row-reverse" style={{marginTop: "20px"}}>
                    <p className="navbar-brand d-flex" id="user-bar">
                        <img src={localStorage.getItem("profileImg") + ".jpg"} alt="Avatar" width="40px"
                             height="40px" className="rounded-pill"/>
                    </p>
                </div>

            </nav>
        </>
    );
}

export default Navigation;