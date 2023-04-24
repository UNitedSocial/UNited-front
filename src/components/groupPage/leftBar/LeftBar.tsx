import "./leftbar.css"
import GroupMember from "../groupMember/GroupMember"
import {Card, CardContent, Stack, Typography} from "@mui/material";
import {useLocation, useParams} from "react-router-dom";
import * as React from "react";
import {useEffect, useState} from "react";
import {getGroupMembers} from "../../../backendConnection/getGroupMembers";

export default function LeftBar() {

    let {groupname} = useParams();
    const location = useLocation();


    const [isLoading, setIsLoading] = useState(true);
    const [hasErrorLoading, sethasErrorLoading] = useState<JSON | null>(null);
    const [groupMembers, setGroupMembers] = useState<any>(null);

    useEffect(() => {
        getGroupMembers(groupname).then(data => loadedGroupMembers(data)).catch(error => errorLoading(error));
    }, [groupname, location]);

    const loadedGroupMembers = (data: any) => {
        try {
            if (data.length === 0) throw new Error("No hay miembros en el grupo");
            setGroupMembers(data);
            setIsLoading(false);
        } catch {
            errorLoading({} as JSON);
        }
    }

    const errorLoading = (error: JSON) => {
        sethasErrorLoading(error);
        setIsLoading(false);
    }

    if (hasErrorLoading !== null || isLoading) {
        return (
            <>
            </>
        )
    }

    return (
        <Card sx={{maxWidth: {xs: "60%", md: "100%"}}} style={{background: "#EFECEB"}} variant="outlined">
            <CardContent>
                {/*<Stack className="sidebarUtilityMenu">
                    <ul>
                        <li>
                            <Link to="/">
                                <BiVideo size={28}/> <span>Videos</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <BiCalendar size={28} style={{paddingBottom: 3}}/> <span>Eventos</span>
                            </Link>
                        </li>
                    </ul>
                </Stack>
                <Divider/>*/}
                <Typography variant="inherit" component="div" sx={{mt: 2, mb: 2}} className="sidebarUtilityTitle">
                    <strong>
                        Miembros del grupo:
                    </strong>
                </Typography>

                <Stack>
                    {groupMembers?.map((u: any, idx: any) => (
                        <GroupMember key={idx} user={u}/>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    )
}
