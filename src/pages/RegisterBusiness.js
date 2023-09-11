import React from "react";
import '../css/registerPage.css';
import BubbleAnimation from "../components/BubbleAnimation";
import BusinessAuthenticationContainer from "../components/BusinessAuthenticationContainer";

function RegisterBusiness() {


    return (
        <div className="auth-body">
            <BubbleAnimation/>
            <div className="center">
                <BusinessAuthenticationContainer/>
            </div>
        </div>
    );
}

export default RegisterBusiness;