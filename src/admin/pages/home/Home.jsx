import React, {useContext} from 'react';
import './Home.scss';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import '../../style/dark.scss';
import {DarkModeContext} from "../../context/darkModeContext";



const Admin = () => {
    const {darkMode} = useContext(DarkModeContext)
    return (
        <div className={ darkMode ? "home dark" : "home" }>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                <Widget type="user" />
                <Widget type="restaurants" />
                <Widget type="city"/>
                <Widget type="hotels"/>
                </div>
                <div className="charts">
                    <Featured />
                    <Chart title="last 6 months revenue" aspect={2 / 1} />
                </div>

            </div>
        </div>
    );
};

export default Admin;