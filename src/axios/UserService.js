import axios from 'axios';

const UserService = {
    getData: async () => {
        try {
            const response = await axios.get('/api/data');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    postData: async (data) => {
        try {
            const headers = { Authorization: `Bearer ${localStorage.getItem('token')}`};
            const response = await axios.post('http://localhost:8888/api/v1/users', data, {headers});
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    registerUser: async (data, event) => {

    },

    putData: async (id, data) => {
        try {
            const response = await axios.put(`/api/data/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    deleteData: async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8888/api/v1/users/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
};

export default UserService;
