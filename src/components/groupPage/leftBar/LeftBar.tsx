import './leftbar.css'
import {Users} from "../../../data"
import GroupMember from '../groupMember/GroupMember'
import {Alert, AlertTitle, Box, Card, CardContent, CircularProgress, Divider, Stack, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import * as React from "react";
import {BiCalendar, BiVideo} from "react-icons/bi";
import {useEffect, useState} from "react";
import {loadGroup} from "../../../backendConnection/loadGroup";
import {loadGroupMembers} from "../../../backendConnection/loadGroupMembers";

export default function LeftBar() {

    let {groupname} = useParams();


    const [isLoading, setIsLoading] = useState(true);
    const [hasErrorLoading, sethasErrorLoading] = useState<JSON | null>(null);
    const [groupMembers, setGroupMembers] = useState<any>(null);

    useEffect(() => {
        loadGroupMembers(groupname).then(data => loadedGroupMembers(data)).catch(error => errorLoading(error));
    }, []);

    const loadedGroupMembers = (data: any) => {
        try {
            setGroupMembers(data);
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
            </>
        )
    }

    if (hasErrorLoading !== null) {
        return (
            <>
            </>
        )
    }

    return (
        <Card sx={{maxWidth: {xs: "60%", md: "80%"}}} style={{background: "#EFECEB"}} variant="outlined">
            <CardContent>
                <Stack className="sidebarUtilityMenu">
                    <ul>
                        <li>
                            <Link to="/">
                                <BiVideo size={28}/> <span>Videos</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/new/group">
                                <BiCalendar size={28} style={{paddingBottom: 3}}/> <span>Eventos</span>
                            </Link>
                        </li>
                    </ul>
                </Stack>
                <Divider/>
                <Typography variant="inherit" component="div" sx={{mt: 2, mb: 2}} className="sidebarUtilityTitle">
                    <strong>
                        Miembros del grupo:
                    </strong>
                </Typography>

                <Stack>
                    {groupMembers.map((u: { id: any; }) => (
                        <GroupMember key={u.id} user={u}/>
                    ))}

                </Stack>
            </CardContent>
        </Card>
    )
}
