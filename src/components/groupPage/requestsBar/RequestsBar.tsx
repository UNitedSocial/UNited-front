import {useParams} from "react-router-dom";
import * as React from "react";
import {useEffect, useState} from "react";
import {Card, CardContent, Stack, Typography} from "@mui/material";
import {getGroupRequests} from "../../../backendConnection/getGroupRequests";
import GroupRequests from "../groupRequests/GroupRequests";

export default function RequestsBar() {

    let {groupname} = useParams();


    const [isLoading, setIsLoading] = useState(true);
    const [hasErrorLoading, sethasErrorLoading] = useState<JSON | null>(null);
    const [groupRequests, setGroupRequests] = useState<any>(null);

    useEffect(() => {
        getGroupRequests(groupname).then(data => loadedGroupRequests(data)).catch(error => errorLoading(error));
    }, [groupname]);

    const loadedGroupRequests = (data: any) => {
        try {
            setGroupRequests(data);
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
        return (<>
        </>)
    }

    return (

        <Card sx={{maxWidth: {xs: "60%", md: "100%"}}} style={{background: "#EFECEB"}} variant="outlined">
            <CardContent>
                <Typography variant="inherit" component="div" sx={{mt: 2, mb: 2}} className="sidebarUtilityTitle">
                    <strong>
                        Peticiones del grupo:
                    </strong>
                </Typography>

                <Stack>
                    {groupRequests?.map((r: any, idx: any) => (<GroupRequests key={idx} request={r}/>))}
                </Stack>
            </CardContent>
        </Card>

    )
}