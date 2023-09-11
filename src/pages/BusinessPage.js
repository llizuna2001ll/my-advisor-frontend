import Navigation from "../components/Navigation";
import {useParams} from "react-router-dom";
import {Grid} from "@mui/material";
import '../css/businessPage.css';
import BusinessCard from "../components/BusinessCard";
import Box from "@mui/material/Box";
import TabContext from '@mui/lab/TabContext';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useEffect, useState} from "react";
import RatingPosts from "../components/RatingPosts";
function BusinessPage() {
    let {business} = useParams();
    const [value, setValue] = useState('1');
    const [businessData, setBusinessData] = useState('1');
    const token = localStorage.getItem("token");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        fetch('http://localhost:8888/api/v1/users/services/' +business, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                setBusinessData(data);
            })
            .catch(error => console.error(error))

    }, [business]);

    return (
        <>
            <Navigation/>
            <section className="hero-section">
                <div className="city-hero">
                    <img className="hero-img" src={`https://myadvisorbucket.s3.eu-north-1.amazonaws.com/${businessData.profileImgPath}`}/>
                    <h1 className="cityDescription">{business}</h1>
                </div>
            </section>
            <div className="mt-2 mb-2" style={{height:'75vh',overflow:'hidden'}}>
                <Grid container>
                    <BusinessCard businessName={business}/>
                    <Box sx={{ width: '70%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 0, borderColor: 'divider', marginLeft:'30%' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Posts" value="1" />
                                    <Tab label="Gallery" value="2" />
                                    <Tab label="Reviews" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">Posts</TabPanel>
                            <TabPanel value="2">Gallery</TabPanel>
                            <TabPanel value="3"><RatingPosts businessName={business}/></TabPanel>
                        </TabContext>
                    </Box>
                </Grid>
            </div>
        </>
    );
}

export default BusinessPage;