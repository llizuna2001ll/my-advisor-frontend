import React, {useContext} from 'react';
import './listCities.scss';
import Navigation from "../../../components/Navigation";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import '../../style/dark.scss';
import {DarkModeContext} from "../../context/darkModeContext";
import Cities from "../../components/cities/Cities";

const ListCitiess = () => {
    const {darkMode} = useContext(DarkModeContext)

    return (
        <div className={darkMode ? "list dark" : "list"} >
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Cities />
            </div>
        </div>
    )
}

export default ListCitiess;