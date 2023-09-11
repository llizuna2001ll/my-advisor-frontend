import React, { useState } from 'react';
import './newBusiness.scss';
import axios from 'axios';

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import '../../style/dark.scss';

const token = localStorage.getItem('token');

const NewBusiness = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [city, setCity] = useState("");
    const [profileImgPath, setProfileImgPath] = useState("");

    const [businessType, setBusinessType] = useState("");
    //const [roles, setRoles] = useState(['BUSINESS']); // Default role


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            username,
            password,
            email,
            phoneNum,
            city,
            profileImgPath,
            businessType,
           // roles: roles.map(role => role.name),
        };

        try {
            const response = await axios.post(
                'http://localhost:8888/api/v1/users/addUser',
                newUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('User added:', response.data);
            setUsername("");
            setPassword("");
            setEmail("");
            setPhoneNum("");
            setCity("");
            setProfileImgPath("");
            setBusinessType("");
          //  setRoles(['BUSINESS']);

        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add new user</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={profileImgPath ? profileImgPath : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                            alt=""
                        />

                    </div>
                    <div className="right">
                        <form className="form" onSubmit={handleFormSubmit}>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadIcon className="icon"/>
                                </label>
                                <input
                                    type="file"
                                    name="profileImgPath"
                                    id="file"
                                    onChange={e => setProfileImgPath(e.target.value)}
                                    style={{ display: "none" }}
                                />
                            </div>
                            <div className="formInput">
                                <label>Username</label>
                                <input
                                    type="text"
                                    placeholder="John_doe"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    name="username"
                                />
                            </div>
                            <div className="formInput">
                                <label>Password</label>
                                <input
                                    type="text"
                                    placeholder="*********"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    name="password"
                                />
                            </div>
                            <div className="formInput">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="John_doe@gmail.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    name="email"
                                />
                            </div>
                            <div className="formInput">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    placeholder="+2126-50-020335"
                                    value={phoneNum}
                                    onChange={e => setPhoneNum(e.target.value)}
                                    name="phoneNum"
                                />
                            </div>

                            <div className="formInput">
                                <label>business Type</label>
                                <input
                                    type="text"
                                    placeholder="Hotel"
                                    value={businessType}
                                    onChange={e => setBusinessType(e.target.value)}
                                    name="businessType"
                                />
                            </div>


                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewBusiness;