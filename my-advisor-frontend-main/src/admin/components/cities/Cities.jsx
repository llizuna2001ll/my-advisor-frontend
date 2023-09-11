import './cities.scss';
import { DataGrid } from '@mui/x-data-grid';
import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

const token = localStorage.getItem('token');

const Cities = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editUserData, setEditUserData] = useState({
        id: "",
        name: "",
        cityDescription: "",
        businessCount: "",
        imgPath: ""
    });
    const actionColumn = [{ field: "action", headerName: "Actions", width:200, renderCell:(params)=>{
            const handleViewClick = () => {
                const name = params.row.name;

                navigate(`/singleCity/${name}`); // Use navigate instead of history.push
            };

            const handleDeleteClick = async (id) => {
                console.log("Deleting city with id:", id);

                const isConfirmed = window.confirm("Are you sure you want to delete this city?");
                if (isConfirmed) {
                    try {
                        const response = await axios.delete(`http://localhost:8888/api/v1/cities/deleteCity/${id}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        });
                        console.log("Delete response:", response.data); // Log the response data for debugging
                        fetchData(); // Refresh the data after successful deletion
                    } catch (error) {
                        console.error('Error deleting city:', error);
                    }
                }
            };

            return(
                <div className="cellAction">
                    <div className="viewButton" onClick={handleViewClick}>View</div>
                    <div className="deleteButton" onClick={() => handleDeleteClick(params.row.id)}>Delete</div>
                    <div className="editButton" onClick={() => handleOpenModal(params)}>Edit</div>


                </div>
            )
        } }];

    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8888/api/v1/cities',{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }});
            const modifiedData = response.data.map((item, index) => ({ ...item, id: index }));

            setData(modifiedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAddCity = () => {
        // Redirect to the "/new" page
        navigate('/newcity');    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal = (params) => {
        const { id, name, cityDescription, businessCount, imgPath } = params.row;
        setEditUserData({ id, name, cityDescription, businessCount, imgPath});
        setIsModalOpen(true);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setEditUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));

    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8888/api/v1/cities/updateCity/${editUserData.name}`,
                editUserData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            console.error('Error updating city data:', error);
        }
    };



    const columns = [
        { field: 'id', headerName: 'City ID', width: 70 },
        { field: 'name', headerName: 'city name', width: 130 },
        { field: 'businessCount', headerName: 'number of businesses', width: 130 },
        { field: 'cityDescription', headerName: 'description', width: 130 },
        {field: 'imgPath', headerName: 'Image',
            renderCell: (params) => (
                <div className="cellWithImg">
                    <img src={params.value} alt="Image" />
                </div>
            ),
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
            <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <DialogTitle>Edit User Data</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">name</label>
                            <TextField
                                type="text"
                                id="name"
                                name="name"
                                value={editUserData.name}
                                onChange={handleInputChange}
                                fullWidth
                                disabled // Disable the input field for username
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="businessCount">businessCount</label>
                            <TextField
                                type="text"
                                id="businessCount"
                                name="businessCount"
                                value={editUserData.businessCount}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cityDescription"> cityDescription</label>
                            <TextField
                                type="text"
                                id="cityDescription"
                                name="cityDescription"
                                value={editUserData.cityDescription}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button onClick={handleFormSubmit} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
            <button onClick={handleAddCity}>Add city</button>

        </div>
    );
}
export default Cities;