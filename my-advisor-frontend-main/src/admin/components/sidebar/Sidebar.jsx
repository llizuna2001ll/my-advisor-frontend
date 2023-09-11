import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link } from "react-router-dom";
import {useContext} from "react";
import {DarkModeContext} from "../../context/darkModeContext";
const Sidebar = () => {
    const {dispatch} = useContext(DarkModeContext)


    return (
        <div className="sidebar">
            <div className="top" >
                <Link to="/" style={{ textDecoration:"none" }}>
                <span className="logo">Admin</span>
                </Link>
            </div>
            <hr />

            <div className="center" >
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        <Link to="/dashboard" style={{ textDecoration:"none" }}>

                        <DashboardIcon className="icon" />
                        <span>Dashboard</span>
                        </Link>
                    </li>
                    <p className="title">LISTS</p>

                    <Link to="/users" style={{ textDecoration:"none" }}>
                    <li>
                        <PersonOutlineOutlinedIcon className="icon" />
                        <span>Users</span>
                    </li>
                    </Link>

                    <Link to="/city" style={{ textDecoration:"none" }}>
                    <li>
                        <LocationCityOutlinedIcon className="icon" />
                        <span>Cities</span>
                    </li>
                    </Link>
                    <Link to="/hotels" style={{ textDecoration:"none" }}>

                    <li>
                        <HotelOutlinedIcon className="icon" />
                        <span>Hotels</span>
                    </li>
                    </Link>

                    <Link to="/restaurants" style={{ textDecoration:"none" }}>
                    <li>
                        <RestaurantMenuOutlinedIcon className="icon" />
                        <span>Restaurants</span>
                    </li>
                    </Link>

                    <Link to="/others" style={{ textDecoration:"none" }}>
                    <li>
                        <LocationCityOutlinedIcon className="icon" />
                        <span>Other services</span>
                    </li>
                    </Link>
                    <p className="title">USEFUL</p>
                    <Link to="/reported" style={{ textDecoration:"none" }}>


                    <li>

                        <ReportGmailerrorredOutlinedIcon className="icon" />
                        <span>Reported posts</span>
                    </li>
                    </Link>
                    <li>
                        <Link to="/auth" style={{ textDecoration:"none" }}>

                        <LogoutOutlinedIcon className="icon" />
                        <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="bo" >
                <div className="colorOptions" onClick={()=> dispatch({type:"LIGHT"})}></div>
                <div className="colorOptions" onClick={()=> dispatch({type:"DARK"})}></div>

            </div>

        </div>
    );
};

export default Sidebar;