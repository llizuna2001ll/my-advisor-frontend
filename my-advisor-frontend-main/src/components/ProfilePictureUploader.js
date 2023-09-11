import React, {useRef, useState} from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function ProfilePictureUploader(props) {
    const uploadedImage = useRef(null);
    const [img, setImg] = useState();
    const jwtToken = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const assignCitiesRequests = props.visitedCities;
    const navigate = useNavigate();
    const handleImageUpload = e => {
        const [file] = e.target.files;
        const username = localStorage.getItem('username');
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
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

            const response = await axios.post('http://localhost:8888/api/v1/users/uploadProfilePicture/'+username, formData, {
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

            axios
                .post(`http://localhost:8888/api/v1/users/addCity/`+localStorage.getItem('username'),assignCitiesRequests, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwtToken}`

                    },
                })
                .then((response) => {
                    navigate('/');
                })
                .catch((error) => {
                    console.error("Error adding city:", error);
                });


        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="App">
            <input style={{marginLeft: "20%", marginTop: "30px"}} type="file" accept="image/*"
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
    );
}

export default ProfilePictureUploader;