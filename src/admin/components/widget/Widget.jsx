import React from 'react';
import './widget.scss';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const token = localStorage.getItem('token');

const Widget = ({ type }) => {
    const [userCount, setUserCount] = useState(0);

    const [cityCount, setCityCount] = useState(0);
    const [businessCount, setBusinessCount] = useState(0);
    const [restoCount, setRestoCount] = useState(0);




    useEffect(() => {
        fetchUserCount();
    }, []);

    const fetchUserCount = async () => {
        try {
            const response = await axios.get('http://localhost:8888/api/v1/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const count = response.data.length;
            setUserCount(count);
        } catch (error) {
            console.error('Error fetching user count:', error);
        }
    };


    useEffect(() => {
        fetchCityCount();
    }, []);

    const fetchCityCount = async () => {
        try {
            const response = await axios.get('http://localhost:8888/api/v1/cities', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const count = response.data.length;
            setCityCount(count);
        } catch (error) {
            console.error('Error fetching city count:', error);
        }
    };

    useEffect(() => {
        fetchHotelCount();
    }, []);
    const fetchHotelCount = async () => {
        try {
            const response = await axios.get('http://localhost:8888/api/v1/users/businesses', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // Filter the response data to get only the BusinessType with TypeName="Hotel"
            const businessesData = response.data.filter((business) => business.businessType === "Hotel");

            // Update the state with the count
            setBusinessCount(businessesData.length);
        } catch (error) {
            console.error('Error fetching business count:', error);
        }
    };


    useEffect(() => {
        fetchRestoCount();
    }, []);

    const fetchRestoCount = async () => {
        try {
            const response = await axios.get('http://localhost:8888/api/v1/users/businesses', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // Filter the response data to get only the BusinessType with TypeName="Hotel"
            const businessesData = response.data.filter((business) => business.businessType === "Restaurant");

            // Update the state with the count
            setRestoCount(businessesData.length);
        } catch (error) {
            console.error('Error fetching business count:', error);
        }
    };


    let data = null;
    switch (type) {
        case "user":
            data = {
                title: "USER",
                isMoney: false,
                link:  <Link to="/users" className="title">
                    view all users
                </Link>,
                counting: userCount,
                icon: <PersonOutlineOutlinedIcon className="icon"
                style={{
                    backgroundColor: "rgba(218, 165, 32, 0.2)",
                    color: "goldenrod",
                }
                }

                    />
            };
            break;

        case "restaurants":
            data = {
                title: "Restaurants",
                isMoney: false,
                counting: restoCount,

                link:  <Link to="/restaurants" className="title">
                    view all restaurants
                </Link>,

                icon: <PostAddOutlinedIcon className="icon"
                                           style={{
                                               backgroundColor: "rgba(0, 128, 0, 0.2)",
                                               color: "green",
                                           }
                                           }
                />
            };
            break;

        case "city":
            data = {
                title: "City",
                isMoney: true,
                link:  <Link to="/city" className="title">
                    view all cities
                </Link>,
                counting: cityCount,

                icon: <AccountBalanceOutlinedIcon className="icon"
                                                  style={{
                                                      color: "purple",
                                                      backgroundColor: "rgba(128, 0, 128, 0.2)",

                                                  }
                                                  }
                />
            };
            break;

        case "hotels":
            data = {
                title: "HOTELS",
                isMoney: false,
                link:  <Link to="/hotels" className="title">
                    view all Hotels
                </Link>,
                counting: businessCount,

                icon: <BusinessCenterOutlinedIcon className="icon"
                                                  style={{
                                                      color: "crimson",
                                                      backgroundColor: "rgba(225, 0, 0, 0.2)",
                                                  }
                                                  }
                />
            };
            break;

        default:
            return <div>Error: Invalid widget type</div>;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.counting} </span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">

                {data.icon}
            </div>
        </div>
    );
};

export default Widget;
