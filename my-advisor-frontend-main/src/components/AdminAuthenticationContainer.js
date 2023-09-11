import '../css/adminAuth.css';
import {useState} from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import {useNavigate} from "react-router-dom";

function AdminAuthenticationContainer() {
    const [signInUsername, setSignInUsername] = useState("");
    const [signInPassword, setSignInPassword] = useState("");
    const [signInError, setSignInError] = useState("");
    const navigate = useNavigate();

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
            const url = 'http://localhost:8888/api/v1/auth/authenticateAdmin';
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
                    navigate("/");
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        setSignInError(error.response.data.error);
                    }
                });
        }
    };

    return (

            <>
            <div className="admin-auth-container">
                <div className="adminLogin text-center">
                    <h3>Admin Login</h3>
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
            </div>
            </>

    )
}

export default AdminAuthenticationContainer;