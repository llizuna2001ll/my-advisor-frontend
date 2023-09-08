import React, {useEffect, useState} from 'react';
import './singleCity.scss';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import Cities from "./Cities";
import { useParams } from 'react-router-dom';
import axios from 'axios';
const token = localStorage.getItem('token');

const SingleCity = () => {
    const { name } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:8888/api/v1/cities/${name}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching city data:', error);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }



    return (
        <div className="single" >
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <div className="editButton">
                            Edit
                        </div>



                        <h1 className="title">Information</h1>
                        <div className="item">
                            <img src={userData.imgPath} alt="" className="itemImg" />
                            <div className="details">
                                <h1 className="itemTitle">{userData.name}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{userData.cityDescription}</span>
                                </div>

                                <div className="detailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">{userData.businessCount}</span>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default SingleCity;