import React, {useContext} from 'react';
import './ListRestaurants.scss';
import Navigation from "../../../components/Navigation";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import '../../style/dark.scss';
import {DarkModeContext} from "../../context/darkModeContext";
import Restaurants from "../../components/restaurants/Restaurants";

const ListRestaurants  = () => {
    const {darkMode} = useContext(DarkModeContext)

    return (
        <div className={darkMode ? "list dark" : "list"} >
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Restaurants />
            </div>
        </div>
    )
}

export default ListRestaurants ;