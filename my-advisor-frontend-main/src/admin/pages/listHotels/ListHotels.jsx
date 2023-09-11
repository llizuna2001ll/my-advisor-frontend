import React, {useContext} from 'react';
import './listHotels.scss';
import Navigation from "../../../components/Navigation";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import '../../style/dark.scss';
import {DarkModeContext} from "../../context/darkModeContext";
import Hotels from "../../components/hotels/Hotels";

const ListHotels  = () => {
    const {darkMode} = useContext(DarkModeContext)

    return (
        <div className={darkMode ? "list dark" : "list"} >
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Hotels />
            </div>
        </div>
    )
}

export default ListHotels ;