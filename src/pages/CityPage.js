import {useParams} from "react-router-dom";
import Navigation from "../components/Navigation";

function CityPage() {
    let { city } = useParams();
    return(
        <>
            <Navigation/>
            <h2>The city you've chosen is {city}</h2>
        </>

    );
}

export default CityPage;