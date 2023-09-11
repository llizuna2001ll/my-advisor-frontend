import React, {useContext} from 'react';
import './listOthers.scss';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import '../../style/dark.scss';
import {DarkModeContext} from "../../context/darkModeContext";
import Others from "../../components/others/Others";

const ListOthers  = () => {
    const {darkMode} = useContext(DarkModeContext)

    return (
        <div className={darkMode ? "list dark" : "list"} >
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Others />
            </div>
        </div>
    )
}

export default ListOthers ;