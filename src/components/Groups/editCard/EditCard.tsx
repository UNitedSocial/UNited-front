import {Card, CardContent, Stack} from "@mui/material";
import * as React from "react";
import {Link, useParams} from "react-router-dom";

export default function EditCard(props: any) {

    const {groupname} = useParams();

    return (
        <Card sx={{maxWidth: {xs: "60%", md: "100%"}}} style={{background: "#EFECEB"}} variant="outlined">
            <CardContent>
                <Stack className="sidebarUtilityMenu">
                    <ul>
                        <li>
                            <Link to={"/edit/" + groupname}>
                                Editar grupo
                            </Link>
                        </li>
                    </ul>
                </Stack>
            </CardContent>
        </Card>
    )

}
