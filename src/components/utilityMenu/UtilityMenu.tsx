import {Card, CardActions, Paper, Stack} from "@mui/material";
import * as React from "react";
import {Link} from "react-router-dom";

function UtilityMenu() {

    function handleClick(button: string) {
        console.log(button);
    }


    return (
        <Paper>
            <Card sx={{maxWidth: {xs: "60%", md: "100%"}}} style={{background: "#EFECEB"}}>
                <CardActions>
                    <Stack className="sidebar">
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
                            <li>
                                <Link to="/">
                                    -
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    -
                                </Link>
                            </li>
                        </ul>
                    </Stack>
                </CardActions>
            </Card>
        </Paper>

    )
}

export default UtilityMenu;
