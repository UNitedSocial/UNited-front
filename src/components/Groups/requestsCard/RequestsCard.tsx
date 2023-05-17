import * as React from "react";
import {Card, CardContent, Stack, Typography} from "@mui/material";
import GroupRequests from "../groupRequests/GroupRequests";

export default function RequestsCard(props: any) {

    const {groupRequests, toogleUpdate, toogleIsLoadingScreen} = props;


    return (

        <Card sx={{maxWidth: {xs: "60%", md: "100%"}}} style={{background: "#EFECEB"}} variant="outlined">
            <CardContent>
                <Typography variant="inherit" component="div" sx={{mt: 2, mb: 2}} className="sidebarUtilityTitle">
                    <strong>
                        Peticiones del grupo:
                    </strong>
                </Typography>

                <Stack>
                    {groupRequests?.map((r: any, idx: any) => (<GroupRequests key={idx} request={r} toogleUpdate={toogleUpdate} toogleIsLoadingScreen={toogleIsLoadingScreen}/>))}
                </Stack>
            </CardContent>
        </Card>

    )
}