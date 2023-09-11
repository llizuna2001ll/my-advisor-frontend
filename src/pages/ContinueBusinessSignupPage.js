import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import React, {useRef, useState} from "react";
import VisitedCities from "../components/VisitedCities";
import ProfilePictureUploader from "../components/ProfilePictureUploader";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function ContinueBusinessSignupPage() {
    const [activeStep, setActiveStep] = React.useState(1);
    const uploadedImage = useRef(null);
    const [img, setImg] = useState();
    const jwtToken = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const handleImageUpload = e => {
        const [file] = e.target.files;
        const username = localStorage.getItem('username');
        if (file) {
            const reader = new FileReader();
            const {current} = uploadedImage;
            current.file = file;
            reader.onload = (e) => {
                current.src = e.target.result;
                const newFileName = `${username}.${file.name.split('.').pop()}`;
                const renamedFile = new File([file], newFileName);
                setImg(renamedFile);

            }
            reader.readAsDataURL(file);
        }
    };

    const handleFinish = async () => {
        try {
            const formData = new FormData();
            formData.append('file', img);

            const response = await axios.post('http://localhost:8888/api/v1/users/uploadProfilePicture/' + username, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwtToken}`
                },
            });

            console.log(response); // Log the entire response object


            if (response.status === 200) {
                const filePath = response.data.split(' : ')[1].trim();
                localStorage.setItem('profileImg', filePath);
                console.log(response.data);

            } else {
                console.error('Unexpected status code:', response.status);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="auth-body">

            <div className="center">
                <Box sx={{
                    width: 800,
                    height: 400,
                    backgroundColor: 'white',
                    marginLeft: '25%',
                    padding: '30px',
                    borderRadius:'20px'
                }}>
                    <Stepper activeStep={activeStep}>
                        <Step>
                            <StepLabel>Fill Information</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Upload A Profile Picture</StepLabel>
                        </Step>
                    </Stepper>
                    <div className="App">
                        <input style={{marginLeft: "30%", marginTop: "30px"}} type="file" accept="image/*"
                               onChange={handleImageUpload}/>
                        <div
                            style={{
                                height: "200px",
                                width: "200px",
                                border: "1px dashed black",
                                marginLeft: "30%",
                                marginTop: "20px",
                                borderRadius: "50%"
                            }}
                        >
                            <img
                                ref={uploadedImage}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "50%"
                                }}
                            />
                        </div>

                        <Button onClick={handleFinish} sx={{position: 'absolute', right: '30%', marginTop: '1%'}}>
                            FINISH
                        </Button>
                    </div>
                </Box>
            </div>
        </div>
    );
}

export default ContinueBusinessSignupPage;