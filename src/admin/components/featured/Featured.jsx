import React, {useEffect, useState} from 'react';
import './Featured.scss';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";

const token = localStorage.getItem('token');

const Featured = () => {
    const [userCount, setUserCount] = useState(0);
    const [userCountToday, setUserCountToday] = useState(0);


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

            const users = response.data;
            setUserCount(users.length);

            // Calculate the number of users registered today
            const today = new Date().toISOString().split('T')[0]; // Get the current date in "YYYY-MM-DD" format
            const usersToday = users.filter(user => user.creationTime.split('T')[0] === today);
            setUserCountToday(usersToday.length);
        } catch (error) {
            console.error('Error fetching user count:', error);
        }
    }

    // Calculate the percentage of users registered today using the count value you already have
    const percentageToday = userCount ? (userCountToday * 100 / userCount) : 0;

    return (
        <div className="featured">
            <div className="top">
                <h1 className="title">
                    Total users
                </h1>
                <MoreVertOutlinedIcon fontSize="small"/>
            </div>
            <div className="b">
                <div className="featuredChart">
                    {/* Use the calculated percentage value for users registered today */}
                    <CircularProgressbar value={percentageToday} text={`${percentageToday.toFixed(1)}%`}
                                         strokeWidth={5}/>
                </div>
                <p className="title">
                    total users registered today
                </p>
                <p className="amount">
                    {userCountToday}
                </p>
            </div>
        </div>

    );
};

export default Featured;
