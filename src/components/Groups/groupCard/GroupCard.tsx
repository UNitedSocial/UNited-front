import "./groupCard.css"
import {Box, Grid, Paper, Typography} from "@mui/material";
import React from "react";
import {MdGroupAdd, MdGroupRemove} from "react-icons/md";
import {RxClock} from "react-icons/rx";
import VerifiedButton from "../../Users/Verified/VerifiedButton";
import {postUserGroupRequest} from "../../../backendConnection/Users/postUserGroupRequest";
import {useAuth0} from "@auth0/auth0-react";

function Group(props: any) {

    const {isPosting, userState, group, toogleUpdate, toogleIsLoadingScreen} = props;

    let {getAccessTokenSilently, user} = useAuth0();

    return (<>
            <Paper
                sx={{
                    position: "relative",
                    color: "#fff",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundImage: `url(../assets/persons/4.png)`,
                    height: "25vh",
                    width: "100%",
                }}
                variant="outlined"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: "rgba(0,0,0,.3)",
                    }}
                />
            </Paper>
            <Paper
                sx={{
                    position: "relative",
                    color: "#EFECEB",
                    mb: 4,
                }}
                variant="outlined"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: "#EFECEB",
                    }}
                />
                <Grid container>
                    <Grid item md={1} sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    </Grid>
                    <Grid item md={9}>
                        <Box
                            sx={{
                                position: "relative",
                                p: 3,
                                pr: 0,
                            }}
                        >
                            <Typography variant="h5" color="black" gutterBottom>
                                {group?.info?.name}
                                {group?.info?.isRecognized ?
                                    <VerifiedButton/>
                                    : null}
                            </Typography>
                            <Typography variant="subtitle1" color="black" paragraph>
                                {group?.info?.description}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item md={2} sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 3
                    }}>
                        <Box
                            sx={{
                                position: "relative",
                                p: 3,
                                pr: 0,
                                pt: 0
                            }}
                        >
                            <button
                                onClick={() => {
                                    if(userState === "doesn't belong" || userState === "member" || userState === "editor") {
                                        toogleIsLoadingScreen(true);
                                        postUserGroupRequest(group?.info?.name, getAccessTokenSilently, userState, user?.nickname).then(() => toogleUpdate())
                                    }
                                }} style={{
                                border: "none",
                                background: "none",
                                padding: "0",
                                font: "inherit",
                                cursor: "pointer"
                            }}>
                                {(() => {
                                    switch (userState) {
                                        case "doesn't belong":
                                            return <MdGroupAdd color={"black"} size={30}/>;
                                        case "pending":
                                            return <RxClock color={"black"} size={30}/>;
                                        case "editor":
                                        case "member":
                                            return <MdGroupRemove color={"black"} size={30}/>;
                                        default:
                                            return null;
                                    }
                                })()}
                            </button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default Group
