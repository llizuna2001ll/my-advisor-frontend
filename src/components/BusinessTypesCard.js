import "../css/businessTypesCard.css";
import {Divider, ListItem, Stack} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Link} from "react-router-dom";
import {useState} from "react";

function BusinessTypesCard() {

    const token = localStorage.getItem('token');
    const [businessTypes, setBusinessTypes] = useState([]);

    fetch('http://localhost:8888/api/v1/businessTypes', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            setBusinessTypes(data.slice(0, 5));
        })
        .catch(error => console.error(error));

    const allBusinessTypes = businessTypes.map((businessType, index) =>
        <Link style={{color: "black", textDecoration: "none"}}
              to={"/businessTypes/" + businessType.typeName.toLowerCase()}><ListItem>
            <div>   
                <img className="rounded-pill" src={businessType.imgPath}/>
            </div>
            <div className="type-name">
                <h5 className=" ms-3 mt-2 ">{businessType.typeName}</h5>
            </div>
            <div>
                <ArrowForwardIosIcon className="ms-5 mt-1"/>
            </div>
        </ListItem><Divider/></Link>
    );
    return (
        <Stack className="business-types-container pt-3 pb-1" direction="column"
               justifyContent="flex-start"
               alignItems="center"
        >
            <h3 className="mb-4"><u>Categories</u></h3>
            {allBusinessTypes}
            <p className="more-categories"><Link to="/categories" style={{color: "black"}}>more categories ></Link></p>
        </Stack>
    );
}

export default BusinessTypesCard;