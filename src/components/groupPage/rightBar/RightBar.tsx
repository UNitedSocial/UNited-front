import './rightBar.css'
import {Group} from '@mui/icons-material'
import {Users,Groups} from "../../../data"
import GroupMember from '../groupMember/GroupMember'
import {BiCalendar, BiVideo} from "react-icons/bi";
import {Card, CardContent, Divider, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export default function RightBar() {
    return(
        <>
            <Card sx={{maxWidth: {xs: "60%", md: "80%"}}} style={{background: "#EFECEB"}} variant="outlined">
                <CardContent>
                    <Typography variant="inherit" component="div" sx={{mb: 2}} className="sidebarUtilityTitle">
                        <strong>
                            Grupos similares:
                        </strong>
                    </Typography>
                    <Stack className="sidebarUtilityMenu">
                        {Groups.map(u=> (
                            <GroupMember key={u.id} user={u}/>
                        ))}
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}