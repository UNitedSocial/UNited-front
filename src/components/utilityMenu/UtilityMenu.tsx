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
                    <Stack>
                        <Link to="/">
                            Home
                        </Link>
                        <Link to="/group">
                            Crear grupo
                        </Link>
                    </Stack>
                </CardActions>
            </Card>
        </Paper>

    )
}

export default UtilityMenu;
