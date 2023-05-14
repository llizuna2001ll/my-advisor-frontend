import Navigation from "../components/Navigation";
import TopBusinesses from "../components/TopBusinesses";
import Carousel from "../components/Carousel";
import {Grid} from "@mui/material";
import "../css/homePage.css";
import BusinessTypesCard from "../components/BusinessTypesCard";

function HomePage() {

    return (
        <>
            <Navigation/>
            <Grid className="mt-5" container>
                <BusinessTypesCard/>
                <div className="carousel-div">
                    <Carousel className="carousel"/>
                </div>
            </Grid>

            <TopBusinesses/>
        </>
    );
}

export default HomePage;