import TopNavBar from "../components/TopNavBar/TopNavBar"
import Feed from "../components/mainFeed/Feed"
import Filters from "../components/filters/Filters"
import GroupForm from "../components/groupForm/GroupForm"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UtilityMenu from "../components/utilityMenu/UtilityMenu";
import React, { useState } from "react";
import {Grid, Stack} from "@mui/material";
import UserProfile from "../components/userPage/UserProfile";
import Leftbar from "../components/groupPage/leftBar/LeftBar"
import Group from "../components/groupPage/Group";
import RightBar from "../components/groupPage/rightBar/RightBar";
import ContactForm from "../components/contactForm/ContactForm";
import RequestsBar from "../components/groupPage/requestsBar/RequestsBar";
import SearchPage from "../components/searchPage/SearchPage";


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
                                <Route path="/search/:query" element={<></>}/>
                                <Route path="/new/group" element={<></>}/>
                                <Route path="/group/:groupname"
                                       element={<Stack spacing={4}><Leftbar/> <RightBar/></Stack>}/>
                                <Route path="/profile" element={<></>}/>
                                <Route path="/contact-us" element={<></>}/>
                            </Routes>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Routes>
                            <Route path="/" element={<Feed filterValueSelected = {filterTextValue} ></Feed>}/>
                            <Route path="/search/:query" element={<SearchPage></SearchPage>}/>
                            <Route path="/new/group" element={<GroupForm/>}/>
                            <Route path="/group/:groupname" element={<Group/>}/>
                            <Route path="/profile" element={<UserProfile/>}/>
                            <Route path="/contact-us" element={<ContactForm/>}/>
                        </Routes>
                    </Grid>

                    <Grid item xs={3}>
                        <Grid container justifyContent="center">
                            <Stack spacing={4}>
                                <UtilityMenu/>
                                <Routes>
                                    <Route path="/" element={<></>}/>
                                    <Route path="/search/:query" element={<></>}/>
                                    <Route path="/new/group" element={<></>}/>
                                    <Route path="/group/:groupname" element={<Stack><RequestsBar/></Stack>}/>
                                    <Route path="/profile" element={<></>}/>
                                    <Route path="/contact-us" element={<></>}/>
                                </Routes>
                            </Stack>
                        </Grid>
                    </Grid>

                </Grid>

            </div>

        </Router>

    </>)
}

export default Home

