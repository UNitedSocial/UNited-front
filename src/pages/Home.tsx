import TopNavBar from "../components/TopNavBar"
import Feed from "../components/mainFeed/Feed"
import GroupForm from "../components/form/GroupForm"
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import UtilityMenu from "../components/utilityMenu/UtilityMenu";
import React from "react";
import {Grid, Stack} from "@mui/material";
import UserProfile from "../components/userProfile/UserProfile";
import Leftbar from "../components/leftBar/LeftBar"
import Group from "./Group";
import RightBar from "../components/rightBar/RightBar";
import {BiCalendar, BiVideo} from "react-icons/bi";


function Home() {
    return (<>

        <Router>

            <TopNavBar/>

            {/*<Leftbar/>*/}

            <div className={"Content"}>

                <Grid container>
                    <Grid item xs={3}>
                        <Grid container justifyContent="center">
                            <Routes>
                                <Route path="/" element={<></>}/>
                                <Route path="/new/group" element={<></>}/>
                                <Route path="/group/:groupID" element={<Stack spacing={4}><Leftbar/> <RightBar/></Stack>}/>
                                <Route path="/profile" element={<></>}/>
                            </Routes>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Routes>
                            <Route path="/" element={<Feed/>}/>
                            <Route path="/new/group" element={<GroupForm/>}/>
                            <Route path="/group/:groupID" element={<Group/>}/>
                            <Route path="/profile" element={<UserProfile/>}/>
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

