import "./rightBar.css"
import {Card, CardContent, Stack, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getGroupSimilar} from "../../../backendConnection/getGroupSimilar";
import GroupSimilar from "../groupSimilar/GroupSimilar";

export default function RightBar() {

    let {groupname} = useParams();

    const [similar, setSimilar] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasErrorLoading, sethasErrorLoading] = useState<JSON | null>(null);

    useEffect(() => {
        getGroupSimilar(groupname).then(data => loadedGroup(data)).catch(error => errorLoading(error));
    }, [groupname]);

    const loadedGroup = (data: any) => {
        try {
            setSimilar(data);
            setIsLoading(false);
        } catch {
            errorLoading({} as JSON);
        }
    }

    const errorLoading = (error: JSON) => {
        sethasErrorLoading(error);
        setIsLoading(false);
    }

    if (hasErrorLoading != null || isLoading) {

        return (<></>)

    }

    return (<>
        <Card sx={{maxWidth: {xs: "60%", md: "100%"}}} style={{background: "#EFECEB"}} variant="outlined">
            <CardContent>
                <Typography variant="inherit" component="div" sx={{mb: 2}} className="sidebarUtilityTitle">
                    <strong>
                        Grupos similares:
                    </strong>
                </Typography>
                <Stack className="sidebarUtilityMenu">
                    <ul>
                        {similar?.map((g: any, idx: any) => {
                            return (<GroupSimilar key={idx} group={g}/>);
                        })}
                    </ul>
                </Stack>
            </CardContent>
        </Card>
    </>)
}