import './App.css';
import {BrowserRouter, Route, Router, Routes, useLocation} from "react-router-dom";
import React from "react";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ForbiddenAccess from "./pages/errorPages/ForbiddenAccess";
import CityPage from "./pages/CityPage";
import AllCitiesPage from "./pages/AllCitiesPage";
import Navigation from "./components/Navigation";


function App() {

        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/auth" element={<AuthPage/>}/>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path={"/cities"} element={<AllCitiesPage/>}/>
                        <Route path="/cities/:city" element={<CityPage/>}/>
                    </Routes>
                </BrowserRouter>
            </>
        );
}


export default App;

