import React from "react";
import '../css/registerPage.css';
import BubbleAnimation from "../components/BubbleAnimation";
import AuthenticationContainer from "../components/AuthenticationContainer";
import {useLocation} from "react-router-dom";

function AuthPage() {


    return (
        <div className="auth-body">
            <BubbleAnimation/>
            <div className="center">
                <AuthenticationContainer/>
            </div>
        </div>
    );
}

export default AuthPage;