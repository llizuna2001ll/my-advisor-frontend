import '../css/navbar.css';
import {Link} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import {Badge, Stack, Tooltip} from "@mui/material";
import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import AWS from "aws-sdk";
import axios from "axios";

function Navigation() {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem("token");
    const [notifications, setNotifications] = useState([]);
    const [imgUrl, setImgUrl] = useState('');
    const [openNotifications, setOpenNotifications] = useState(false);
    const unseenNotifications = notifications.filter(notification => !notification.seen);
    const [latestNotificationTimestamp, setLatestNotificationTimestamp] = useState(0);

    const fetchNotifications = () => {
        fetch(`http://localhost:8888/api/v1/notifications/getFullNotification/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setNotifications(data.reverse());

                if (data.length > 0) {
                    setLatestNotificationTimestamp(data[0].timestamp);
                }
            })
            .catch(error => console.error(error));
    };


    useEffect(() => {
        fetchNotifications();
    }, [token, username]);


    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchNotifications();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [token, username]);


    const openNotification = () => {
        setOpenNotifications(!openNotifications);
        if (openNotifications) {
            axios.post('http://localhost:8888/api/v1/notifications/setSeen/' + username, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setNotifications(response.data);
                })
                .catch(error => {
                    // Handle the error here
                });
        }
    }

    useEffect(() => {

        AWS.config.update({
            accessKeyId: 'AKIAQ4ELPGT7UYVJS7XZ',
            secretAccessKey: '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',
            region: 'eu-north-1',
        });

        const s3 = new AWS.S3();

        const bucketName = 'myadvisorbucket';
        const imageKey = localStorage.getItem('profileImg');

        const getObjectUrl = async (bucketName, key) => {
            const params = {Bucket: bucketName, Key: key};
            try {
                const data = await s3.getObject(params).promise();
                return data;
            } catch (error) {
                console.error('Error getting S3 object:', error);
                throw error;
            }
        };

        getObjectUrl(bucketName, imageKey)
            .then((data) => {
                const imageSrc = URL.createObjectURL(new Blob([data.Body]));
                setImgUrl(imageSrc);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <>
            <nav style={{color: "white"}}
                 className="navbar navbar-expand-sm navigation-container navbar-light text-center">
                <div className="nav-logo">
                    <Link style={{color: "white", textDecoration: "none"}} to="/"><h3>MyAdvisor.com</h3></Link>
                </div>
                <ul style={{marginTop: "5px", marginLeft: "22%"}} className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link navitem" to="/cities">Cities</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link navitem" to="/businesses">Businesses</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link navitem" to="/categories">Categories</Link>
                    </li>
                </ul>

                <ul className="dropdown d-flex flex-row mt-3">
                    <li><Link to=""><Tooltip disableFocusListener title="Account"><PersonIcon className=" navitem"
                                                                                              fontSize="medium"/></Tooltip></Link>
                    </li>
                    <li><Link to="/messages"><Tooltip disableFocusListener title="Messages"><ChatIcon
                        className=" navitem" fontSize="medium"/></Tooltip></Link></li>
                    <li><Link to="/favorites"><Tooltip disableFocusListener title="Favorites"><FavoriteIcon
                        className=" navitem" fontSize="medium"/></Tooltip></Link></li>

                    {unseenNotifications.length > 0 ? (
                            <li><Link onClick={openNotification} to=""><Tooltip disableFocusListener
                                                                                title="Notifications"><Badge
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                overlap="circular"
                                variant="dot"
                                color={"error"}
                            ><NotificationsIcon className=" navitem" fontSize="medium"/></Badge></Tooltip></Link></li>) :
                        (<li><Link onClick={openNotification} to=""><Tooltip disableFocusListener title="Notifications"><NotificationsIcon
                            className=" navitem" fontSize="medium"/></Tooltip></Link></li>)}
                    {openNotifications && (
                        <div className={"notifications-container"}>
                            <h2 className={"mb-3 ms-4"}>Notifications</h2>
                            <Stack>
                                {notifications.length > 0 ? (
                                    notifications.map((notification, index) => (
                                        <div key={notification.notificationId} className="notification-container">
                                            <img src={imgUrl} alt="Avatar" width="40px" height="40px"
                                                 className="rounded-pill"/>
                                            <p>{notification.notificationObject}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className={"mb-3 ms-4"}>0 notifications</p>
                                )}
                            </Stack>
                        </div>
                    )}
                    <li><Link to="/auth" onClick={() => {
                        localStorage.clear()
                    }} className="dropdown-item"><Tooltip disableFocusListener title="Logout"><LogoutIcon
                        className=" navitem" fontSize="medium"/></Tooltip></Link></li>
                </ul>

                <div className="container-fluid d-flex flex-row-reverse" style={{marginTop: "20px"}}>
                    <p className="navbar-brand d-flex" id="user-bar">
                        <img src={imgUrl} alt="Avatar" width="40px"
                             height="40px" className="rounded-pill"/>
                    </p>
                </div>

            </nav>
        </>
    );
}

export default Navigation;