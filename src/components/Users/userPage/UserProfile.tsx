import {useAuth0} from "@auth0/auth0-react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import React from "react";
import VerifiedButton from "./Verified/VerifiedButton";
import LoadingScreen from "../../../pages/Loading/LoadingScreen";

function UserProfile() {
    const {user, isAuthenticated, getAccessTokenSilently, isLoading} = useAuth0();

    if (isLoading) {
        return (
            <LoadingScreen />
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