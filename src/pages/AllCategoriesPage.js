import {useState} from "react";
import {Link} from "react-router-dom";
import Navigation from "../components/Navigation";
import {Breadcrumbs} from "@mui/material";

function AllCategoriesPage() {

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
            setBusinessTypes(data);
        })
        .catch(error => console.error(error));

    const allBusinesTypes = businessTypes.map((businessType, index)=>
        <div key={businessType.typeId} className="card allcities-container">
            <Link style={{fontSize:"30px", textDecoration:"none"}} to={`/categories/${businessType.typeName}`}><div  className="card-body"><img style={{opacity: "100%"}} className="topcities-img" height="100px" width="20%" src={businessType.imgPath}/> {businessType.typeName}</div></Link>
            <p>{businessType.businessCount} business available</p>
        </div>
    );
    return(
        <>
            <Navigation/>
            <div className=" container mt-5">
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link to="/">Home</Link>
                    <Link style={{color:"black",textDecoration:"none",cursor:"default"}}>Categories</Link>
                </Breadcrumbs>
                <h2 className="fw-bold mt-3">All categories</h2>
                <div className=" container mt-5">
                    <div style={{marginLeft:"150px"}} className="row justify-content-center mb-2 mt-3">
                        {allBusinesTypes}
                    </div>
                </div>
            </div>
        </>
    );
}
export default AllCategoriesPage;