import '../css/adminAuth.css';
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import {Link, useNavigate} from "react-router-dom";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";


function BusinessAuthenticationContainer() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneNumError, setPhoneNumError] = useState("");
    const [city, setCity] = useState("");
    const [cityError, setCityError] = useState("");
    const [businessType, setBusinessType] = useState("");
    const [businessTypeError, setBusinessTypeError] = useState("");
    const [profileImg, setProfileImg] = useState();
    const [openingTime, setOpeningTime] = useState("");
    const [openingTimeError, setOpeningTimeError] = useState("");
    const [closingTime, setClosingTime] = useState("");
    const [closingTimeError, setClosingTimeError] = useState("");
    const [businessTypes, setBusinessTypes] = useState([]);
    const [cities, setCities] = useState([]);
    const [profileImgError, setProfileImgError] = useState();
    const uploadedImage = useRef(null);

    const navigate = useNavigate();

    const addToLocalStorage = (username) => {
        fetch('http://localhost:8888/api/v1/users/' + username, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                localStorage.setItem("profileImg", data.profileImgPath);
                localStorage.setItem("email", data.email);
                localStorage.setItem("accountId", data.accountId);

            })
            .catch(error => console.error(error));

    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        setUsernameError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setEmailError("");
        setPhoneNumError("");
        setCityError("");
        setBusinessTypeError("");
        setOpeningTimeError("");
        setClosingTimeError("");


        if (confirmPassword === password) {
            const url = 'http://localhost:8888/api/v1/auth/registerBusiness';
            const data = {username, password, email, phoneNum, city, openingTime, closingTime, businessType};
            await axios.post(url, data)
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    const decodedToken = jwt_decode(response.data.token);
                    localStorage.setItem('username', decodedToken.sub);
                    const authoritiesArray = decodedToken.authorities.map((auth) => auth.authority);
                    localStorage.setItem('authorities', JSON.stringify(authoritiesArray));
                    navigate("/continue-business-signup")
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        setUsernameError(error.response.data.username);
                        setPasswordError(error.response.data.password);
                        setEmailError(error.response.data.email);
                        setPhoneNumError(error.response.data.phoneNum);
                        setClosingTimeError(error.response.data.openingTime);
                        setOpeningTimeError(error.response.data.closingTime);
                        setCityError(error.response.data.city);
                        setBusinessTypeError(error.response.data.businessType);
                    }
                });
        } else {
            setConfirmPasswordError("Password and Confirm password aren't the same");
        }
    }


    useEffect(() => {
        fetch('http://localhost:8888/api/v1/businessTypes', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setBusinessTypes(data);
            })
            .catch(error => console.error(error));
    }, [businessTypes.length]);


    useEffect(() => {
        fetch('http://localhost:8888/api/v1/cities', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setCities(data);
            })
            .catch(error => console.error(error));
    }, [cities.length]);

    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
            if (file.size <= 5 * 1024 * 1024) { // 5MB in bytes
                const reader = new FileReader();
                const {current} = uploadedImage;
                current.file = file;
                reader.onload = (e) => {
                    current.src = e.target.result;
                    const newFileName = `${username}.${file.name.split('.').pop()}`;
                    const renamedFile = new File([file], newFileName);
                    setProfileImg(renamedFile);
                }
                reader.readAsDataURL(file);
            } else {
                alert("File size exceeds the maximum limit of 5MB.");
                e.target.value = null;
            }
        }
    };

    const allBusinesTypes = businessTypes.map((businessType, index) =>
        <MenuItem value={`${businessType.typeName}`}>{businessType.typeName}</MenuItem>
    );

    const allCities = cities.map((city, index) =>
        <MenuItem value={`${city.name}`}>{city.name}</MenuItem>
    );

    return (

        <div className={"admin-auth-container"}>
            <div className="signup-form show">
                <h3>Create Business Account</h3>
                <div className="inputs">
                    <form onSubmit={handleSignUp}>
                        <input className="form-control" type="text" placeholder="Business Name"
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                        <p className="mb-4 text-danger">{usernameError}</p>
                        <input className="form-control" type="text" placeholder="Email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                        <p className="mb-4 text-danger">{emailError}</p>
                        <input className="form-control" type="text" placeholder="06XXXXXXXX"
                               value={phoneNum}
                               onChange={(e) => setPhoneNum(e.target.value)}/>
                        <p className="mb-4 text-danger">{phoneNumError}</p>
                        <FormControl sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
                                     size="small">
                            <InputLabel id={`relation-label`}>City</InputLabel>
                            <div>
                                <Select
                                    sx={{minWidth: '200px'}}
                                    labelId={'relation-label'}
                                    id={'relation-select'}
                                    value={city}
                                    label="Relation"
                                    onChange={(event) => setCity(event.target.value)}
                                >
                                    {allCities}
                                </Select>
                                <p className="mb-4 text-danger">{cityError}</p>
                            </div>
                            <FormControl
                                size="small">
                                <InputLabel id={`relation-label`}>BusinessType</InputLabel>
                                <div>
                                    <Select
                                        sx={{minWidth: '200px'}}
                                        labelId={'relation-label'}
                                        id={'relation-select'}
                                        value={businessType}
                                        label="Relation"
                                        onChange={(event) => setBusinessType(event.target.value)}
                                    >
                                        {allBusinesTypes}
                                    </Select>
                                    <p className="mb-4 text-danger">{businessTypeError}</p>
                                </div>
                            </FormControl>
                            {/*<div>
                                <input onChange={handleImageUpload} type="file" accept="image/*"
                                />
                                <p className="mb-4 text-danger">{profileImgError}</p>
                            </div>*/}
                            <div>
                                <input className="form-control" type="text" placeholder="Opening Time (HH:MM)"
                                       value={openingTime}
                                       onChange={(e) => setOpeningTime(e.target.value)}/>
                                <p className="mb-4 text-danger">{openingTimeError}</p>
                            </div>
                            <div>
                                <input className="form-control" type="text" placeholder="Closing Time (HH:MM)"
                                       value={closingTime}
                                       onChange={(e) => setClosingTime(e.target.value)}/>
                                <p className="mb-4 text-danger">{closingTimeError}</p>
                            </div>
                        </FormControl>
                        <input className="form-control" type="password" placeholder="Password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                        <p className="mb-4 text-danger">{passwordError}</p>
                        <input className="form-control" type="password" placeholder="Confirm Password"
                               value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <p className="mb-4 text-danger">{confirmPasswordError}</p>
                        <div className="d-grid col-3 mx-auto mb-3">
                            <button type="submit" className="btn btn-primary auth-button">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default BusinessAuthenticationContainer;