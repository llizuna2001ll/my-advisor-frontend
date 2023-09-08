import './hotels.scss';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
const token = localStorage.getItem('token');
const Hotels = () => {
    const navigate = useNavigate();

    const actionColumn = [
        {
            field: "action",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => {
                const handleViewClick = () => {

                    const name = params.row.name;

                    navigate(`/singleHotel/${name}`); // Use navigate instead of history.push
                };

                return (
                    <div className="cellAction">
                        <div className="viewButton" onClick={handleViewClick} >View</div>
                        <div className="deleteButton" onClick={() => handleDeleteClick(params.row.typeName)}>Delete</div>
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
                'http://localhost:8888/api/v1/businessTypes',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Filter the data to retrieve only hotels
            const hotelsData = response.data.filter(
                (item) => item.typeName === 'Hotel'
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


    const handleDeleteClick = async (typeName) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this business?");
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:8888/api/v1/businessTypes/deleteBusinessType/${typeName}`, {
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
        { field: 'typeName', headerName: 'Business Type', width: 130 },
        { field: 'name', headerName: 'Business name', width: 130 },

        { field: 'businessCount', headerName: 'Number of Businesses', width: 130 },
        { field: 'writingDate', headerName: 'Description', width: 130 },
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

export default Hotels;