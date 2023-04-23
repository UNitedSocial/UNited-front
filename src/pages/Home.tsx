import TopNavBar from "../components/TopNavBar/TopNavBar"
import Feed from "../components/mainFeed/Feed"
import Filters from "../components/filters/Filters"
import GroupForm from "../components/groupForm/GroupForm"
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import UtilityMenu from "../components/utilityMenu/UtilityMenu";
import React, { useState } from "react";
import {Grid, Stack} from "@mui/material";
import UserProfile from "../components/userPage/UserProfile";
import Leftbar from "../components/groupPage/leftBar/LeftBar"
import Group from "../components/groupPage/Group";
import RightBar from "../components/groupPage/rightBar/RightBar";
import {BiCalendar, BiVideo} from "react-icons/bi";
import ContactForm from "../components/contactForm/ContactForm";


function Home() {
    let[filterTextValue,updateFilterText] =React.useState<any>('all');


    function onFilterValueSelected(filterValue:any){
  
        updateFilterText(filterValue);
        updateFilterText(filterValue);
        //console.log(filterTextValue);

    }

    return (<>

        <Router>

            <TopNavBar/>

            <div className={"Content"}>

                <Grid container>
                    <Grid item xs={3}>
                        <Grid container justifyContent="center">
                            <Routes>
                                <Route path="/" element={<Filters filterValueSelected={onFilterValueSelected} ></Filters>}/>
                                <Route path="/new/group" element={<></>}/>
                                <Route path="/group/:groupname" element={<Stack spacing={4}><Leftbar/> <RightBar/></Stack>}/>
                                <Route path="/profile" element={<></>}/>
                            </Routes>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Routes>
                            <Route path="/" element={<Feed filterValueSelected = {filterTextValue} ></Feed>}/>
                            <Route path="/new/group" element={<GroupForm/>}/>
                            <Route path="/group/:groupname" element={<Group/>}/>
                            <Route path="/profile" element={<UserProfile/>}/>
                            <Route path="/contact-us" element={<ContactForm />}/>
                        </Routes>
                    </Grid>

                    <Grid item xs={3}>
                        <Grid container justifyContent="center">
                            <UtilityMenu/>
                        </Grid>
                    </Grid>


                </Grid>

            </div>

        </Router>

    </>)
}

export default Home

