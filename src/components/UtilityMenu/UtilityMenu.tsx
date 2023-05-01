import {Card, CardContent, Stack} from "@mui/material";
import * as React from "react";
import {Link} from "react-router-dom";
import "./UtilityMenu.css"

export default function UtilityMenu() {

    return (
        <Card sx={{maxWidth: {xs: "60%", md: "100%"}}} style={{background: "#EFECEB"}} variant="outlined">
            <CardContent>
                <Stack className="sidebarUtilityMenu">
                    <ul>
                        <li>
                            <Link to="/">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to="/new/group">
                                Crear grupo
                            </Link>
                        </li>
                    </ul>
                </Stack>
            </CardContent>
        </Card>

    )
}
