import './Restaurants.scss';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
const token = localStorage.getItem('token');
const Restaurants = () => {
    const navigate = useNavigate();
    const [editUserData, setEditUserData] = useState({
        id: "",
        username: "",
        ratingCounter:"",
        creationTime: "",
        phoneNum: "",
        businessType:"",
        profileImgPath: ""
    });

    const actionColumn = [
        {
            field: "action",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => {
                const handleViewClick = () => {

                    const username = params.row.username;

                    navigate(`/singleHotel/${username}`); // Use navigate instead of history.push
                };

                return (
                    <div className="cellAction">
                        <div className="viewButton" onClick={handleViewClick} >View</div>
                        <div className="deleteButton" onClick={() => handleDeleteClick(params.row.username)}>Delete</div>
                    </div>
                );
            },
        },
    ];

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8888/api/v1/users/businesses',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Filter the data to retrieve only hotels
            const hotelsData = response.data.filter(
                (item) => item.businessType === 'Restaurant'
            );

            const modifiedData = hotelsData.map((item, index) => ({
                ...item,
                id: index,
            }));

            setData(modifiedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleAddHotel = () => {
        navigate('/newbusiness');    };


    const handleDeleteClick = async (username) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this business?");
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:8888/api/v1/users/deleteUser//${username}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                fetchData(); // Refresh the data after successful deletion
            } catch (error) {
                console.error('Error deleting business:', error);
            }
        }
    };

    const columns = [
        { field: 'id', headerName: 'User ID', width: 70 },
        { field: 'username', headerName: 'Business name', width: 130 },
        { field: 'ratingCounter', headerName: 'rating', width: 130 },
        { field: 'creationTime', headerName: 'creation Time', width: 130 },
        { field: 'phoneNum', headerName: 'phone Number', width: 130 },
        { field: 'businessType', headerName: 'business Type', width: 130 },

        {
            field: 'imgPath',
            headerName: 'Image',
            renderCell: (params) => (
                <div className="cellWithImg">
                    <img src={params.value} alt="Image" />
                </div>
            ),
        },
    ];

    return (
        <div className="datatable">
            <div style={{ height: 400, width: '100%', color: 'gray' }}>
                <DataGrid
                    className="dt"
                    columns={columns.concat(actionColumn)}
                    rows={data}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                />
            </div>
            <button onClick={handleAddHotel}>Add Hotel</button>

        </div>

    );
};

export default Restaurants;