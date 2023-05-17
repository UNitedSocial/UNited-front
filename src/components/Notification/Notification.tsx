import {Alert, Snackbar} from "@mui/material";
import React from "react";

export default function Notification(props: any) {

    const {notificationDTO} = props;
    const {setNotificationDTO} = props;

    console.log("notificationDTO", notificationDTO)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setNotificationDTO({...notificationDTO, open: false});
    };

    return (
        <Snackbar open={notificationDTO.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={notificationDTO.severity} sx={{width: "100%"}}>
                <div style={{whiteSpace: "pre-line"}}>{notificationDTO.message}</div>
            </Alert>
        </Snackbar>
    )

}