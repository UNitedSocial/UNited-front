import {Grid} from "@mui/material";
import React, {useState} from "react";
import {RxCheckCircled, RxCrossCircled} from "react-icons/rx";
import {useParams} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import {putGroupRequest} from "../../../backendConnection/Groups/putGroupRequest";
import Notification from "../../Notification/Notification";

export default function GroupRequests(props: any) {

    let {request, toogleUpdate, toogleIsLoadingScreen} = props;
    let {groupname} = useParams();
    let {getAccessTokenSilently, user} = useAuth0();

    const [notificationDTO, setNotificationDTO] = useState<any>({open: false, message: "", severity: "info"});

    return (
        <li className="sidebarFriend">
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <span className="sidearFriendName">{request?.name}</span>
                </Grid>
                <Grid item xs={1.5}>
                    <button
                        onClick={() => {
                            toogleIsLoadingScreen(true);
                            putGroupRequest(user?.nickname, "approved", request?.username, groupname, getAccessTokenSilently).then(() => toogleUpdate()).catch(e => {
                                toogleIsLoadingScreen(false);
                                setNotificationDTO({open: true, message: e?.message, severity: "error"});
                            })
                        }}
                        style={{
                            border: "none",
                            background: "none",
                            padding: "0",
                            font: "inherit",
                            cursor: "pointer"
                        }}>
                        <RxCheckCircled color={"green"} size={15}/>
                    </button>
                </Grid>
                <Grid item xs={1.5}>
                    <button
                        onClick={() => {
                            toogleIsLoadingScreen(true);
                            putGroupRequest(user?.nickname, "rejected", request?.username, groupname, getAccessTokenSilently).then(() => toogleUpdate()).catch(e => {
                                toogleIsLoadingScreen(false);
                                setNotificationDTO({open: true, message: e?.message, severity: "error"});
                            })
                        }}
                        style={{
                            border: "none",
                            background: "none",
                            padding: "0",
                            font: "inherit",
                            cursor: "pointer"
                        }}>
                        <RxCrossCircled color={"red"} size={15}/>
                    </button>
                </Grid>
            </Grid>
            <Notification notificationDTO={notificationDTO} setNotificationDTO={setNotificationDTO}/>
        </li>
    )
}