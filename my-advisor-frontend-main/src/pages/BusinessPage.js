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
import {useState} from "react";
import RatingPosts from "../components/RatingPosts";
function BusinessPage() {
    let {business} = useParams();
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Navigation/>
            <section className="hero-section">
                <div className="city-hero">
                    <img className="hero-img" src={'../images/profilePics/' + business + '.jpg'}/>
                    <h1 className="cityDescription">{business}</h1>
                </div>
            </section>
            <div className="mt-2 mb-2" style={{height:'75vh',overflow:'hidden'}}>
                <Grid container>
                    <BusinessCard businessName={business}/>
                    <Box sx={{ width: '70%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginLeft:'40%' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Posts" value="1" />
                                    <Tab label="Reviews" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">Item One</TabPanel>
                            <TabPanel value="2"><RatingPosts businessName={business}/></TabPanel>
                            <TabPanel value="3">Item Three</TabPanel>
                        </TabContext>
                    </Box>
                </Grid>
            </div>
        </>
    );
}

export default BusinessPage;