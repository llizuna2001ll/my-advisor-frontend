import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField} from "@mui/material"; // Import useNavigate


const token = localStorage.getItem('token');

const Datatable = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editUserData, setEditUserData] = useState({
        id: "",
        username: "",
        email: "",
        phoneNum: "",
        profileImgPath: "",
        roles: [] // Roles field initialized as an empty array
    });

    const actionColumn = [{ field: "action", headerName: "Actions", width:200,
        renderCell:(params)=>{
            const handleViewClick = () => {
                // Get the user ID from the current row and navigate to the target page
                const username = params.row.username;
                navigate(`/user/${username}`); // Use navigate instead of history.push
            };


            return(
                <div className="cellAction">
                    <div className="viewButton" onClick={handleViewClick}>View</div>
                    <div className="editButton" onClick={() => handleOpenModal(params)}>Edit</div>

                    <div className="deleteButton" onClick={() => handleDeleteClick(params.row.username)}>Delete</div>


                </div>
            )
        } }];

    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8888/api/v1/users',{
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

    const handleAddUser = () => {
        // Redirect to the "/new" page
        navigate('/new');    };

    const handleDeleteClick = async (username) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:8888/api/v1/users/deleteUser/${username}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                fetchData(); // Refresh the data after successful deletion
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal = (params) => {
        const { id, username, email, phoneNum, profileImgPath, roles } = params.row;
        setEditUserData({ id, username, email, phoneNum, profileImgPath, roles: [roles] });
        setIsModalOpen(true);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Special handling for the "roles" field
        if (name === 'roles') {
            setEditUserData((prevUserData) => ({
                ...prevUserData,
                roles: [value], // If "roles" is an array, wrap the selected role in an array
            }));
        } else {
            // For other fields, update as usual
            setEditUserData((prevUserData) => ({
                ...prevUserData,
                [name]: value,
            }));
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8888/api/v1/users/updateUser/${editUserData.username}`,
                editUserData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };


    const columns = [
        { field: 'id', headerName: 'User ID', width: 70 },
        { field: 'username', headerName: 'Username', width: 130 },
        { field: 'email', headerName: 'email', width: 130 },
        { field: 'phoneNum', headerName: 'phone number', width: 130 },
        { field: 'roles', headerName: 'Role', width: 130 },

        {field: 'profileImgPath', headerName: 'Image',
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
                          onRowDoubleClick={handleOpenModal}

                />
            </div>

            <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <DialogTitle>Edit User Data</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <TextField
                                type="text"
                                id="username"
                                name="username"
                                value={editUserData.username}
                                onChange={handleInputChange}
                                fullWidth
                                disabled // Disable the input field for username
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <TextField
                                type="email"
                                id="email"
                                name="email"
                                value={editUserData.email}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNum">Phone Number</label>
                            <TextField
                                type="text"
                                id="phoneNum"
                                name="phoneNum"
                                value={editUserData.phoneNum}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="roles">Roles</label>
                            <TextField
                                select
                                id="roles"
                                name="roles"
                                value={editUserData.roles[0]} // Set the selected role
                                onChange={handleInputChange}
                                fullWidth
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="user">User</MenuItem>
                                <MenuItem value="business">Business</MenuItem>
                            </TextField>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button onClick={handleFormSubmit} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
            <button onClick={handleAddUser}>Add user</button>
        </div>
    );
}
export default Datatable;