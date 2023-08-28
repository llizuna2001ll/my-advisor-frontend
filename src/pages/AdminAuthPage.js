import React from "react";
import '../css/registerPage.css';
import BubbleAnimation from "../components/BubbleAnimation";
import AdminAuthenticationContainer from "../components/AdminAuthenticationContainer";
import {useLocation} from "react-router-dom";

function AdminAuthPage() {


    return (
        <div className="auth-body">
            <BubbleAnimation/>
            <div className="center">
                <AdminAuthenticationContainer/>
            </div>
        </div>
    );
}

export default AdminAuthPage;