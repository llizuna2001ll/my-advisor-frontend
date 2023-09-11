import React, {useContext} from 'react';
import './listReported.scss';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import '../../style/dark.scss';
import {DarkModeContext} from "../../context/darkModeContext";
import Reported from "../reported/Reported";

const ListOthers  = () => {
    const {darkMode} = useContext(DarkModeContext)

    return (
        <div className={darkMode ? "list dark" : "list"} >
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Reported />
            </div>
        </div>
    )
}

export default ListOthers ;