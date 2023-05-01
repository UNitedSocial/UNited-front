import {Box, CircularProgress} from "@mui/material";
import React from "react";

export default function LoadingScreen(props: any) {

    return (
        <Box
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }}
        >
            <CircularProgress size={70}
                              sx={{color: "#0c4c8a"}}/>
        </Box>
    )

}