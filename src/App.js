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
import RegisterBusiness from "./pages/RegisterBusiness";
import Admin from "./admin/pages/home/Home";
import List from './admin/pages/list/List';
import Log from './admin/pages/login/Login';
import Neew from './admin/pages/new/New';
import Single from './admin/pages/single/Single';
import Test from "./admin/components/widget/test";
import ListCitiess from "./admin/pages/listCities/ListCitiess";
import ListHotels from "./admin/pages/listHotels/ListHotels";
import ListRestaurants from "./admin/pages/listRestaurants/ListRestaurants";
import ListOthers from "./admin/pages/listOthers/ListOthers";
import Testing from "./admin/components/datatable/Testing";
import SingleCity from "./admin/components/cities/SingleCity";
import SingleHotel from "./admin/components/hotels/SingleHotel";
import SingleRestaurant from "./admin/components/restaurants/SingleRestaurant";
import NewCity from "./admin/pages/newCity/NewCity";
import NewBusiness from "./admin/pages/newBusiness/NewBusiness";
import "./admin/style/dark.scss";
import SingleOthers from "./admin/components/others/SingleOthers";
import ContinueSignUp from "./pages/ContinueSignUp";
import ContinueBusinessSignupPage from "./pages/ContinueBusinessSignupPage";


function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/auth" element={<AuthPage/>}/>
                    <Route path="/continue-signup" element={<ContinueSignUp/>}/>
                    <Route path="/register-business" element={<RegisterBusiness/>}/>
                    <Route path="/continue-business-signup" element={<ContinueBusinessSignupPage/>}/>
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


                    <Route path="/dashboard" element={<Admin/>}/>
                    <Route path="/users" element={<List/>}/>
                    <Route path="/log" element={<Log/>}/>
                    <Route path="/new" element={<Neew/>}/>
                    <Route path="/newcity" element={<NewCity/>}/>
                    <Route path="/newbusiness" element={<NewBusiness/>}/>
                    <Route path="/user/:username" element={<Single/>}/>
                    <Route path="/test" element={<Test/>}/>
                    <Route path="/city" element={<ListCitiess/>}/>
                    <Route path="/hotels" element={<ListHotels/>}/>
                    <Route path="/restaurants" element={<ListRestaurants/>}/>
                    <Route path="/others" element={<ListOthers/>}/>

                    <Route path="/testing" element={<Testing/>}/>
                    <Route path="/singleCity/:name" element={<SingleCity/>}/>
                    <Route path="/singleHotel/:name" element={<SingleHotel/>}/>

                    <Route path="/SingleRestaurant/:name" element={<SingleRestaurant/>}/>
                    <Route path="/SingleOthers/:name" element={<SingleOthers/>}/>

                </Routes>
            </BrowserRouter>
        </>
    );
}


export default App;

