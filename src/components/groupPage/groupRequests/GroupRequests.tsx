import {Grid} from "@mui/material";
import React from "react";
import {RxCheckCircled, RxCrossCircled} from "react-icons/rx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {putGroupRequest} from "../../../backendConnection/putGroupRequest";
import {useAuth0} from "@auth0/auth0-react";

export default function GroupRequests({request}: any) {

    let {groupname} = useParams();
    let {getAccessTokenSilently, user} = useAuth0();
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <li className="sidebarFriend">
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <span className="sidearFriendName">{request?.name}</span>
                </Grid>
                <Grid item xs={1.5}>
                    <button
                        onClick={() => putGroupRequest(user?.nickname, "approve", request?.username, groupname, getAccessTokenSilently).then(() => {
                            const queryParams = new URLSearchParams(location.search);
                            queryParams.set("state", "");
                            navigate({search: queryParams.toString()});
                        })}
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
                        onClick={() => putGroupRequest(user?.nickname, "reject", request?.username, groupname, getAccessTokenSilently).then(() => {
                            const queryParams = new URLSearchParams(location.search);
                            queryParams.set("state", "");
                            navigate({search: queryParams.toString()});
                        })}
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
        </li>
    )
}