import React, { useState } from 'react';
import './NewCity.scss';
import axios from 'axios';

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import '../../style/dark.scss';

const token = localStorage.getItem('token');

const NewCity = () => {

    const [name, setName] = useState("");
    const [cityDescription, setCityDescription] = useState("");
    const [imgPath, setImgPath] = useState("");
    const [businessCount, setBusinessCount] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            name,
            cityDescription,
            imgPath,
            businessCount,
        };

        try {
            const response = await axios.post(
                'http://localhost:8888/api/v1/cities/addCity',
                newUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('city added:', response.data);
            setName("");
            setCityDescription("");
            setImgPath("");
            setBusinessCount("");
        } catch (error) {
            console.error('Error adding city:', error);
        }
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add new City</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={imgPath ? imgPath : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
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
                                    name="imgPath"
                                    id="file"
                                    onChange={e => setImgPath(e.target.value)}
                                    style={{ display: "none" }}
                                />
                            </div>
                            <div className="formInput">
                                <label>name</label>
                                <input
                                    type="text"
                                    placeholder="Casablanca"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    name="name"
                                />
                            </div>
                            <div className="formInput">
                                <label>description</label>
                                <input
                                    type="text"
                                    placeholder="city discription"
                                    value={cityDescription}
                                    onChange={e => setCityDescription(e.target.value)}
                                    name="cityDescription"
                                />
                            </div>
                            <div className="formInput">
                                <label>businessCount</label>
                                <input
                                    type="text"
                                    placeholder="0"
                                    value={businessCount}
                                    onChange={e => setBusinessCount(e.target.value)}
                                    name="businessCount"
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

export default NewCity;
