import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField} from "@mui/material"; // Import useNavigate


const token = localStorage.getItem('token');


const Testing = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editUserData, setEditUserData] = useState({
        id: "",
        name: "",
        cityDescription: "",
        businessCount: "",
        imgPath: ""
    });

    const actionColumn = [{ field: "action", headerName: "Actions", width:200,
        renderCell:(params)=>{
            const handleViewClick = () => {
                // Get the user ID from the current row and navigate to the target page
                const name = params.row.name;

                navigate(`/singleCity/${name}`); // Use navigate instead of history.push
            };

            return(
                <div className="cellAction">
                    <div className="viewButton" onClick={handleViewClick}>View</div>

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
            await axios.put(`http://localhost:8888/api/v1/cities/updateCity/${editUserData.name}`, editUserData, {
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
        { field: 'id', headerName: 'city ID', width: 70 },
        { field: 'name', headerName: 'name', width: 130 },
        { field: 'businessCount', headerName: 'businessCount', width: 130 },
        { field: 'cityDescription', headerName: 'cityDescription number', width: 130 },

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
                                type="email"
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
        </div>
    );
}
export default Testing;