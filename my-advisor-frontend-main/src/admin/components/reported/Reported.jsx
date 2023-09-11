import './Reported.scss';
import { DataGrid } from '@mui/x-data-grid';
import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

const token = localStorage.getItem('token');

const Reported = () => {
    const navigate = useNavigate();
    const [editUserData, setEditUserData] = useState({
        id: "",
        name: "",
        cityDescription: "",
        businessCount: "",
        imgPath: ""
    });
    const actionColumn = [{ field: "action", headerName: "Actions", width:200, renderCell:(params)=>{

            const handleDeleteClick = async (id) => {
                console.log("Deleting post with id:", id);

                const isConfirmed = window.confirm("Are you sure you want to delete this post?");
                if (isConfirmed) {
                    try {
                        const response = await axios.delete(`http://localhost:8888/api/v1/posts/deletePost/${id}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        });
                        console.log("Delete response:", response.data); // Log the response data for debugging
                        fetchData(); // Refresh the data after successful deletion
                    } catch (error) {
                        console.error('Error deleting post:', error);
                    }
                }
            };

            return(
                <div className="cellAction">

                    <div className="deleteButton" onClick={() => handleDeleteClick(params.row.id)}>Delete</div>

                </div>
            )
        } }];

    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8888/api/v1/posts', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // Filter out posts where the 'reports' field is an object with a length greater than 0
            const filteredData = response.data.filter((item) => {
                const reports = item.reports;

                // Check if 'reports' is an object and has at least one key
                return typeof reports === 'object' && Object.keys(reports).length > 0;
            });

            // Add an 'id' field to each item for DataGrid
            const modifiedData = filteredData.map((item, index) => ({ ...item, id: index }));

            setData(modifiedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const columns = [
        { field: 'accountUsername', headerName: 'username', width: 130 },
        { field: 'postTitle', headerName: 'Title', width: 130 },
        { field: 'postDescription', headerName: 'post Description', width: 130 },
        { field: 'postRating', headerName: 'Rating', width: 130 },
        { field: 'postDate', headerName: 'Date', width: 130 },
        {
            field: 'reports', // Assuming 'reports' is the field name in your 'posts' collection
            headerName: 'Reports', // You can change the header name as needed
            width: 130,
            renderCell: (params) => {
                // Access the 'reports' field for the current row
                const reports = params.value;

                // Display the reports data as key-value pairs
                return (
                    <div>
                        {Object.entries(reports).map(([key, value], index) => (
                            <div key={index}>
                                {key}: {value}
                            </div>
                        ))}
                    </div>
                );
            },
        },

    ];
    return (
        <div className="datatable">
            <div style={{ height: 400, width: '100%', color:'gray' }}>
                <DataGrid className="dt" columns={columns.concat(actionColumn)} rows={data}
                          pageSize={9}
                          rowsPerPageOptions={[9]}
                          checkboxSelection
                />
            </div>

        </div>
    );
}
export default Reported;