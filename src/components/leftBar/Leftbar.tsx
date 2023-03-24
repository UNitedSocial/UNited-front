import './leftbar.css'
import {Users} from "../../data"
import GroupMember from '../groupMember/GroupMember'
import {Card, CardContent, Divider, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import * as React from "react";
import {BiCalendar, BiVideo} from "react-icons/bi";

export default function LeftBar() {
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
                    {Users.map(u => (
                        <GroupMember key={u.id} user={u}/>
                    ))}

                </Stack>
            </CardContent>
        </Card>
    )
}
