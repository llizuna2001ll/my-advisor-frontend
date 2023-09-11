import React, {useEffect, useState} from 'react';
import './SingleOthers.scss';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from 'react-router-dom';
import axios from 'axios';
const token = localStorage.getItem('token');

const SingleOthers = () => {
    const { name } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:8888/api/v1/businessTypes/${name}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching business data:', error);
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
                                <h1 className="itemTitle">{userData.typeName}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">businessCount:</span>
                                    <span className="itemValue">{userData.businessCount}</span>
                                </div>

                                <div className="detailItem">
                                    <span className="itemKey">Name:</span>
                                    <span className="itemValue">{userData.name}</span>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default SingleOthers;