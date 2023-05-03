import {Card, CardContent, Stack} from "@mui/material";
import * as React from "react";

export default function FilterFeed(props: any) {

    const {filters, setFilters} = props;

    return (
        <Card sx={{maxWidth: {xs: "60%", md: "100%"}}} style={{background: "#EFECEB"}} variant="outlined">
            <CardContent>
                <Stack className="sidebarUtilityMenu">
                    <ul>
                        <li>
                            <button
                                onClick={() => console.log("Left1")}>
                                <span>Left</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => console.log("Left2")}>
                                <span>Left</span>
                            </button>
                        </li>
                    </ul>
                </Stack>
            </CardContent>

        </Card>
    )
}