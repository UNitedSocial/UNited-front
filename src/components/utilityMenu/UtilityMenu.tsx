import {Card, CardActions, CardContent, Paper, Stack} from "@mui/material";
import * as React from "react";
import {Link} from "react-router-dom";
import "./UtilityMenu.css"

function UtilityMenu() {

    function handleClick(button: string) {
        console.log(button);
    }


    return (
            <Card sx={{maxWidth: {xs: "60%", md: "100%"}}} style={{background: "#EFECEB"}} variant="outlined">
                <CardContent>
                    <Stack className="sidebarUtilityMenu">
                        <ul>
                            <li>
                                <Link to="/">
                                    Home
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

export default UtilityMenu;
