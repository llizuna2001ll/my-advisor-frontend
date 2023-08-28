import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import CityPage from "./pages/CityPage";
import AllCitiesPage from "./pages/AllCitiesPage";
import AllCategoriesPage from "./pages/AllCategoriesPage";
import CategoryPage from "./pages/CategoryPage";
import BusinessPage from "./pages/BusinessPage";
import AllBusinesses from "./pages/AllBusinesses";
import FavoritesPage from "./pages/FavoritesPage";
import MessagesPage from "./pages/MessagesPage";
import UserPage from "./pages/UserPage";
import AdminAuthPage from "./pages/AdminAuthPage";
import RatingPage from "./pages/RatingPage";


function App() {

        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/auth" element={<AuthPage/>}/>
                        <Route path="/admin" element={<AdminAuthPage/>}/>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path={"/cities"} element={<AllCitiesPage/>}/>
                        <Route path="/cities/:city" element={<CityPage/>}/>
                        <Route path="/categories" element={<AllCategoriesPage/>}/>
                        <Route path="/favorites" element={<FavoritesPage/>}/>
                        <Route path="/categories/:category" element={<CategoryPage/>}/>
                        <Route path="/businesses" element={<AllBusinesses/>}/>
                        <Route path="/businesses/:business" element={<BusinessPage/>}/>
                        <Route path="/users/:user" element={<UserPage/>}/>
                        <Route path="/messages" element={<MessagesPage/>}/>
                        <Route path="/businesses/:business/:reviewId" element={<RatingPage/>}/>
                    </Routes>
                </BrowserRouter>
            </>
        );
}


export default App;

