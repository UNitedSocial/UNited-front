import TopNavBar from "../components/TopNavBar"
import Feed from "../components/mainFeed/Feed"
import GroupForm from "../components/form/GroupForm"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UtilityMenu from "../components/utilityMenu/UtilityMenu";
import React from "react";
import {Grid} from "@mui/material";

function Home() {
    return (<>

        <Router>

            <TopNavBar/>

            <div className={"Content"}>

                <Grid container>
                    <Grid item xs={3}>
                        <Grid container justifyContent="center">
                            <UtilityMenu/>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>

                        <Routes>
                            <Route path="/" element={<Feed/>}/>
                            <Route path="/new/group" element={<GroupForm/>}/>
                        </Routes>
                    </Grid>

                    <Grid item xs={3}>
                        <Grid container justifyContent="center">
                            <>
                            </>
                        </Grid>
                    </Grid>

                </Grid>

            </div>

        </Router>

    </>)
}

export default Home

