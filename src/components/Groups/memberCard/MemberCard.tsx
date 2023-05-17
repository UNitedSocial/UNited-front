import "./memberCard.css"
import GroupMember from "./groupMember/GroupMember"
import {Card, CardContent, Stack, Typography} from "@mui/material";
import * as React from "react";

export default function MemberCard(props: any) {

    const {groupMembers, userState, groupName, toogleUpdate, toogleIsLoadingScreen} = props;

    return (
        <Card sx={{maxWidth: {xs: "60%", md: "100%"}}} style={{background: "#EFECEB"}} variant="outlined">
            <CardContent>
                <Typography variant="inherit" component="div" sx={{mt: 2, mb: 2}} className="sidebarUtilityTitle">
                    <strong>
                        Miembros del grupo:
                    </strong>
                </Typography>

                <Stack>
                    {groupMembers?.map((member: any, idx: any) => (
                        <GroupMember key={idx} member={member} userState={userState} groupName={groupName}
                                     toogleUpdate={toogleUpdate} toogleIsLoadingScreen={toogleIsLoadingScreen}/>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    )
}
