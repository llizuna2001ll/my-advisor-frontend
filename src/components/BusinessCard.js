import {Badge, Chip, Grid, Rating, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import AWS from "aws-sdk";

function BusinessCard(props) {
    const token = localStorage.getItem("token");
    const [business, setBusiness] = useState([]);
    const [rating, setRating] = useState(0);
    useEffect(() => {
        fetch('http://localhost:8888/api/v1/users/services/' + props.businessName, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                    setBusiness(data);
                    setRating(data.rating);
            })
            .catch(error => console.error(error))

    }, [business]);



    return (
        <>

            <div className="business-card w-25">
                <div className="d-flex justify-content-center mt-1 mb-2">
                    <Rating size="large" name="read-only"
                            style={rating >= 4 ? {color: "#2E7D32"} : rating >= 3 && rating < 4 ? {color: "#ED6C02"} : {color:"#D32F2F"}}
                            value={rating} precision={0.25}
                            readOnly/>
                    <Chip
                        color={
                            rating === "N/A"
                                ? "primary"
                                : rating >= 4
                                    ? "success"
                                    : rating >= 3 && rating < 4
                                        ? "warning"
                                        : "error"
                        }
                        label={rating !== null ? rating.toFixed(2) : "N/A"}
                        className="ms-2 fw-bold"
                    />
                </div>
                <img src={`https://myadvisorbucket.s3.eu-north-1.amazonaws.com/${business.profileImgPath}`} alt="profile-img"/>
                <div className="business-card-info ">
                    <h4 className="text-center mt-2 mb-4">{business.username}</h4>
                    <Stack className=" ms-2">
                        <Grid container>
                            <p className="fw-bolder">Business Type</p>
                            <p>: {business.businessType}</p>
                        </Grid>
                        <Grid container>
                            <p className="fw-bolder">City</p>
                            <p>: {business.city}</p>
                        </Grid>
                        <Grid container>
                            <p className="fw-bolder">Opening Time</p>
                            <p>: {business.openingTime}</p>
                        </Grid>
                        <Grid container>
                            <p className="fw-bolder">Closing Time</p>
                            <p>: {business.closingTime}</p>
                        </Grid>
                    </Stack>
                </div>
            </div>
        </>
    );
}

export default BusinessCard;