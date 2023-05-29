import TopNavBar from "../components/TopNavBar/TopNavBar"
import Feed from "../pages/Feed/Feed"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import Group from "../pages/Group/Group";
import NewGroup from "./NewGroup/NewGroup";
import ContactUs from "./Contact Us/ContactUs";
import Profile from "./Profile/Profile";
import EditGroup from "./EditGroup/EditGroup";
import Admin from "./Admin/Admin";


function Home() {

    return (<>

        <Router>

            <TopNavBar/>

            <div className={"Content"}>

                <Routes>
                    <Route path="/" element={<Feed/>}/>
                    <Route path="/search/:query" element={<Feed/>}/>
                    <Route path="/new/group" element={<NewGroup/>}/>
                    <Route path="/group/:groupname" element={<Group/>}/>
                    <Route path="/edit/:groupname" element={<EditGroup/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/contact-us" element={<ContactUs/>}/>
                </Routes>

            </div>

        </Router>


    </>)
}

export default Home

