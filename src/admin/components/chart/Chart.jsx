import React, { useEffect, useState } from 'react';
import './Chart.scss';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
const token = localStorage.getItem('token');

const Chart = ({ aspect, title }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:8888/api/v1/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const users = response.data;
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            // Initialize an array to hold the user counts for each month
            const userCountsByMonth = Array(12).fill(0);

            // Loop through the users and count the number of registered users for each month
            users.forEach(user => {
                const creationDate = new Date(user.creationTime);
                const month = creationDate.getMonth(); // 0 to 11
                userCountsByMonth[month]++;
            });

            // Create an array of objects with the data in the format expected by the AreaChart
            const chartData = months.map((month, index) => ({
                name: month,
                total: userCountsByMonth[index],
            }));

            setData(chartData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <div className="chart">
            <div className="title">{title}</div>
            <ResponsiveContainer width="100%" aspect={aspect}>
                <AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="gray" />
                    <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                    <Tooltip />
                    <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
