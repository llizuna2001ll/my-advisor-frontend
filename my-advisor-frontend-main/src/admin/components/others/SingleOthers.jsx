import React, {useEffect, useState} from 'react';
import './SingleOthers.scss';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from 'react-router-dom';
import axios from 'axios';
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiVVNFUiJ9XSwic3ViIjoiTm91aGFpbGEiLCJpYXQiOjE2OTQxOTIwOTAsImV4cCI6MTY5NDc5Njg5MH0.aHfA-C8Nho5jTY_lQx-x9SKrXGttanfgrUlmh7Yib9g";

const SingleOthers = () => {
    const { username } = useParams();
    console.log('Username:', username);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, [username, token]);
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:8888/api/v1/users/businesses/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('API Response:', response.data); // Log the entire response
            setUserData(response.data);
            console.log('user data:', userData[0].username); // Log the entire response



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
                            <img src={userData.profileImgPath} alt="" className="itemImg" />
                            <div className="details">
                                <h1 className="itemTitle">{username}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Rating:</span>
                                    <span className="itemValue">{userData[0].ratingCounter}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone Number:</span>
                                    <span className="itemValue">{userData[0].phoneNum}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Business Type:</span>
                                    <span className="itemValue">{userData[0].businessType}</span>
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