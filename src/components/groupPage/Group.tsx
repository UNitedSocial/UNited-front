import "./group.css"
import {useParams} from "react-router-dom";
import {
    Alert,
    AlertTitle,
    Avatar,
    Box,
    ButtonBase,
    CircularProgress,
    Grid,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {MdGroupAdd} from "react-icons/md";
import {loadGroup} from "../../backendConnection/loadGroup";
import UNited_logo from "../../assets/united_logo_no_bg_white.png";
import VerifiedButton from "../userPage/Verified/VerifiedButton";
import {postUserGroupRequest} from "../../backendConnection/postUserGroupRequest";
import {useAuth0} from "@auth0/auth0-react";


function Group() {

    let {groupname} = useParams();

    const {getAccessTokenSilently} = useAuth0();


    const [isLoading, setIsLoading] = useState(true);
    const [hasErrorLoading, sethasErrorLoading] = useState<JSON | null>(null);
    const [group, setGroup] = useState<any>(null);

    useEffect(() => {
        loadGroup(groupname).then(data => loadedGroup(data)).catch(error => errorLoading(error));
    }, []);

    const loadedGroup = (data: any) => {
        try {
            setGroup(data);
            setIsLoading(false);
        } catch {
            errorLoading(JSON.parse('{}'));
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
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <CircularProgress size={70}
                                      sx={{color: '#0c4c8a'}}/>
                </Box>
            </>
        )
    }

    if (hasErrorLoading !== null) {
        return (
            <>
                <Box maxWidth="false" style={{position: 'relative'}}>

                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={5}
                        sx={{width: '100%'}}>
                        <Alert severity="error" sx={{width: '100%'}}>
                            <AlertTitle>Error</AlertTitle>
                            Couldn't retreive information
                        </Alert>
                    </Stack>

                </Box>
            </>
        )
    }

    return (<>
            <Paper
                sx={{
                    position: 'relative',
                    color: '#fff',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(../assets/persons/4.png)`,
                    height: "25vh",
                    width: "100%",
                }}
                variant="outlined"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgba(0,0,0,.3)',
                    }}
                />
            </Paper>
            <Paper
                sx={{
                    position: 'relative',
                    color: '#EFECEB',
                    mb: 4,
                }}
                variant="outlined"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: '#EFECEB',
                    }}
                />
                <Grid container>
                    <Grid item md={1} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    </Grid>
                    <Grid item md={9}>
                        <Box
                            sx={{
                                position: 'relative',
                                p: 3,
                                pr: 0,
                            }}
                        >
                            <Typography variant="h5" color="black" gutterBottom>
                                {group.info.name}
                                {group.info.isRecognized ?
                                    <VerifiedButton />
                                    : <></>}
                            </Typography>
                            <Typography variant="subtitle1" color="black" paragraph>
                                {group.info.description}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item md={2} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 3
                    }}>
                        <Box
                            sx={{
                                position: 'relative',
                                p: 3,
                                pr: 0,
                                pt: 0
                            }}
                        >
                            <ButtonBase onClick={() => postUserGroupRequest(groupname, getAccessTokenSilently)}>
                                <MdGroupAdd color={"black"} size={30}/>
                            </ButtonBase>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default Group