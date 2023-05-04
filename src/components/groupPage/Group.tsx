import "./group.css"
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Alert, AlertTitle, Box, CircularProgress, Grid, Paper, Stack, Typography,TextField,Button} from "@mui/material";
import React, {useEffect, useState} from "react";
import {MdGroupAdd, MdGroupRemove} from "react-icons/md";
import {getGroup} from "../../backendConnection/getGroup";
import VerifiedButton from "../userPage/Verified/VerifiedButton";
import {postUserGroupRequest} from "../../backendConnection/postUserGroupRequest";
import {useAuth0} from "@auth0/auth0-react";
import {getUserStateGroup} from "../../backendConnection/getUserStateGroup";
import {RxClock} from "react-icons/rx";
import GroupSectionCreationTemplate from "./GroupSectionCreationTemplate";


function Group() {

    const location = useLocation();
    const navigate = useNavigate();
    let {groupname} = useParams();

    const {getAccessTokenSilently, user} = useAuth0();

    const [isLoading, setIsLoading] = useState(true);
    const [hasErrorLoading, sethasErrorLoading] = useState<JSON | null>(null);
    const [group, setGroup] = useState<any>(null);
    const [userState, setUserState] = useState<any>(null);

    useEffect(() => {
        getGroup(groupname).then(data => loadedGroup(data)).catch(error => errorLoading(error));
        if (user !== undefined) {
            getUserStateGroup(groupname, user?.nickname).then(r => {
                if (r.state !== userState) {
                    const queryParams = new URLSearchParams(location.search);
                    queryParams.set('state', r.state);
                    setUserState(r.state);
                    navigate({search: queryParams.toString()});
                }
            }).catch(e => console.log(e))
        }
    }, [groupname, user, location]);

    const loadedGroup = (data: any) => {
        try {
            setGroup(data);
            setIsLoading(false);
        } catch {
            errorLoading({} as JSON);
        }
    }

    const errorLoading = (error: JSON) => {
        sethasErrorLoading(error);
        setIsLoading(false);
    }


    if (isLoading) {
        return (
            <>
                <Box
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                >
                    <CircularProgress size={70}
                                      sx={{color: "#0c4c8a"}}/>
                </Box>
            </>
        )
    }

    if (hasErrorLoading !== null) {
        return (
            <>
                <Box maxWidth="false" style={{position: "relative"}}>

                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={5}
                        sx={{width: "100%"}}>
                        <Alert severity="error" sx={{width: "100%"}}>
                            <AlertTitle>Error</AlertTitle>
                            Hubo un error al cargar el grupo
                        </Alert>
                    </Stack>

                </Box>
               
                <GroupSectionCreationTemplate />
               
            </>
        )
    }

    /* componentes que solo se muestran a un editor de grupo
    if (userState == 'belongs'){
        return
    } 
    */

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
                                {group.info.name}
                                {group.info.isRecognized ?
                                    <VerifiedButton/>
                                    : <></>}
                            </Typography>
                            <Typography variant="subtitle1" color="black" paragraph>
                                {group.info.description}
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
                                onClick={() => postUserGroupRequest(groupname, getAccessTokenSilently, userState, user?.nickname).then(() => {
                                    const queryParams = new URLSearchParams(location.search);
                                    queryParams.set("state", "");
                                    navigate({search: queryParams.toString()});
                                    setUserState("");
                                })} style={{
                                border: "none",
                                background: "none",
                                padding: "0",
                                font: "inherit",
                                cursor: "pointer"
                            }}>
                                {(() => {
                                    switch (userState) {
                                        case "notBelongs":
                                            return <MdGroupAdd color={"black"} size={30}/>;
                                        case "pending":
                                            return <RxClock color={"black"} size={30}/>;
                                        case "belongs":
                                            return <MdGroupRemove color={"black"} size={30}/>;
                                        default:
                                            return <></>;
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