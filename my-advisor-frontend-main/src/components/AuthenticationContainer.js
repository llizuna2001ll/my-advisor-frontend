import '../css/authentication.css';
import {useState} from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import {useNavigate} from "react-router-dom";

function AuthenticationContainer() {
    const [username, setUsername] = useState("");
    const [signInUsername, setSignInUsername] = useState("");
    const [signInPassword, setSignInPassword] = useState("");
    const [signInError, setSignInError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneNumError, setPhoneNumError] = useState("");
    var state = 1;
    const navigate = useNavigate();
    const handleSignUp = async (event) => {
        event.preventDefault();
        setUsernameError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setEmailError("");
        setPhoneNumError("");
        if (confirmPassword === password) {
            const url = 'http://localhost:8888/api/v1/auth/register';
            const data = {username, password, email, phoneNum};
            await axios.post(url, data)
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    const decodedToken = jwt_decode(response.data.token);
                    localStorage.setItem('username', decodedToken.sub);
                    const authoritiesArray = decodedToken.authorities.map((auth) => auth.authority);
                    localStorage.setItem('authorities', JSON.stringify(authoritiesArray));
                    navigate("/continue-signup")
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        setUsernameError(error.response.data.username);
                        setPasswordError(error.response.data.password);
                        setEmailError(error.response.data.email);
                        setPhoneNumError(error.response.data.phoneNum);
                    }
                });
        } else {
            setConfirmPasswordError("Password and Confirm password aren't the same");
        }

    };

    const addToLocalStorage = (username) => {
        fetch('http://localhost:8888/api/v1/users/' + username , {
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

    const handleSignIn = async (event) => {
        event.preventDefault();
        if (signInPassword.length === 0 || signInUsername.length === 0) {
            setSignInError("Fill in all fields!");
        } else {
            const url = 'http://localhost:8888/api/v1/auth/authenticate';
            const username = signInUsername;
            const password = signInPassword;
            const data = {username, password};
            await axios.post(url, data)
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    const decodedToken = jwt_decode(response.data.token);
                    localStorage.setItem('username', decodedToken.sub);
                    const authoritiesArray = decodedToken.authorities.map((auth) => auth.authority);
                    localStorage.setItem('authorities', JSON.stringify(authoritiesArray));
                    setSignInError("login successful");
                    addToLocalStorage(localStorage.getItem("username"));
                    if(authoritiesArray.includes("ADMIN")){
                        navigate("/dashboard");
                    }
                    else{
                        navigate("/");
                    }
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        setSignInError(error.response.data.error);
                    }
                });
        }
    };

    function changeAuth() {
        const cover = document.getElementsByClassName("cover")[0];
        const img = document.getElementsByClassName("auth-img")[0];
        const authText = document.getElementById("auth-text");
        const coverBtn = document.getElementById("cover-btn");
        const loginForm = document.getElementsByClassName("login-form")[0];
        const signUpForm = document.getElementsByClassName("signup-form")[0];

        if (state === 1) {
            state = 0;
            cover.classList.add("img-reverse");
            img.classList.add("img-reverse");
            authText.innerHTML = "Join Us Now";
            coverBtn.innerHTML = "Sign Up";
            signUpForm.classList.remove("show");
            loginForm.classList.add("show");
        } else {
            state = 1;
            cover.classList.remove("img-reverse");
            img.classList.remove("img-reverse");
            authText.innerHTML = "Welcome Back";
            coverBtn.innerHTML = "Sign In";
            signUpForm.classList.add("show");
            loginForm.classList.remove("show");
        }
    }

    return (
        <div className="auth-container">
            <>
                <div className="login-form text-center">
                    <h3>Sign In</h3>
                    <div className="inputs">
                        <form onSubmit={handleSignIn}>
                            <input className="form-control mb-3" type="text" placeholder="Username"
                                   value={signInUsername}
                                   onChange={(e) => setSignInUsername(e.target.value)}/>
                            <input className="form-control mb-2" type="password" placeholder="Password"
                                   value={signInPassword}
                                   onChange={(e) => setSignInPassword(e.target.value)}/>
                            <p className="mb-4 text-danger">{signInError}</p>
                            <div className="d-grid col-6 mx-auto text-center">
                                <button type="submit" className="btn btn-primary auth-button">Sign In</button>

                            </div>
                        </form>
                    </div>
                </div>
                <div className="img-cover">
                    <img className="auth-img" src="./images/auth-image.jpg" width={669} height={500}/>
                    <div className="cover">
                        <p id="auth-text">Welcome Back</p>
                        <button type="button" onClick={changeAuth} className="btn btn-primary auth-button"
                                id="cover-btn">Sign In
                        </button>
                    </div>
                </div>
            </>
            <div className="signup-form show">
                <h3>Create Account</h3>
                <div className="inputs">
                    <form onSubmit={handleSignUp}>
                        <input className="form-control" type="text" placeholder="Username"
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
                        <input className="form-control" type="password" placeholder="Password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                        <p className="mb-4 text-danger">{passwordError}</p>
                        <input className="form-control" type="password" placeholder="Confirm Password"
                               value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <p className="mb-4 text-danger">{confirmPasswordError}</p>
                        <div className="d-grid col-3 mx-auto">
                            <button type="submit" className="btn btn-primary auth-button">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AuthenticationContainer;