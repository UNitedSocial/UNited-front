import {useAuth0} from "@auth0/auth0-react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import React from "react";
import VerifiedButton from "./Verified/VerifiedButton";

function UserProfile() {
    const {user, isAuthenticated, getAccessTokenSilently, isLoading} = useAuth0();

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

    return (

        <Card sx={{maxWidth: {xs: "60%", md: "50vw"}}} style={{background: "#EFECEB"}} variant="outlined">
            <CardContent>
                <Typography variant="h4" component="div">
                    {user?.name}
                </Typography>
                <Typography gutterBottom variant="body2">
                    {user?.email} {user?.email_verified ?
                    <VerifiedButton/>
                    : null}
                </Typography>
            </CardContent>
        </Card>);
}

export default UserProfile