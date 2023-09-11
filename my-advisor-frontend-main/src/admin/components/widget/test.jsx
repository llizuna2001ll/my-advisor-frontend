import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal'; // Import react-modal
import { useNavigate } from 'react-router-dom';

const token = localStorage.getItem('token');

const Test = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
    const [editedUser, setEditedUser] = useState(null); // State for the user being edited

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8888/api/v1/users', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const modifiedData = response.data.map((item, index) => ({ ...item, id: index }));
            setData(modifiedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleEditClick = (user) => {
        setEditedUser(user);
        setIsEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setEditedUser(null); // Reset the edited user when the modal is closed
    };

    const handleSave = async () => {
        try {
            // Make the API call to update the user data with editedUser
            // ...

            // Close the modal after saving
            setIsEditModalOpen(false);
            setEditedUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const actionColumn = [{
        field: "action",
        headerName: "Actions",
        width: 200,
        renderCell: (params) => {
            return (
                <div className="cellAction">
                    <div className="viewButton" onClick={() => navigate(`/users/${params.row.username}`)}>View</div>
                    <div className="editButton" onClick={() => handleEditClick(params.row)}>Edit</div>
                    <div className="deleteButton">Delete</div>
                </div>
            );
        }
    }];

    const columns = [
        // ... (previous columns)
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
            {/* Edit User Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={handleEditModalClose}
                ariaHideApp={false}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1000
                    },
                    content: {
                        width: '400px',
                        margin: 'auto',
                        borderRadius: '8px',
                        padding: '16px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }
                }}
            >
                <h2>Edit User</h2>
                {editedUser && (
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={editedUser.username}
                            // Implement onChange handler to update editedUser
                            onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                        />
                        {/* Add other input fields for editing other user data */}
                    </div>
                )}
                <div style={{ marginTop: '16px' }}>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleEditModalClose}>Cancel</button>
                </div>
            </Modal>
        </div>
    );
};

export default Test;
