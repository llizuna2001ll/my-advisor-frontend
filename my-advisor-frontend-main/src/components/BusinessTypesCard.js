import "../css/businessTypesCard.css";
import {Divider, ListItem, Stack} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function BusinessTypesCard() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [businessTypes, setBusinessTypes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8888/api/v1/businessTypes', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 401) {
                    navigate('/auth');
                }
                return response.json()
            })
            .then(data => {
                setBusinessTypes(data.slice(0, 5));
            })
            .catch(error => console.error(error));
    },[businessTypes.length]);

    const allBusinessTypes = businessTypes.map((businessType, index) =>
        <Link key={businessType.typeId} style={{color: "black", textDecoration: "none"}}
              to={"/categories/" + businessType.typeName}>
            <div className="card-hover"><ListItem>
                <div>
                    <img className="rounded-pill" src={businessType.imgPath}/>
                </div>
                <div className="type-name">
                    <h5 className=" ms-3 mt-2 ">{businessType.typeName}</h5>
                </div>
                <div>
                    <ArrowForwardIosIcon className="ms-5 mt-1"/>
                </div>
            </ListItem><Divider/></div>
        </Link>
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