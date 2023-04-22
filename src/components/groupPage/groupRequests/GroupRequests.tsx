import {postUserGroupRequest} from "../../../backendConnection/postUserGroupRequest";
import {MdGroupAdd} from "react-icons/md";
import {ButtonBase, Grid} from "@mui/material";
import React from "react";
import {RxCheckCircled, RxCrossCircled} from "react-icons/rx";

export default function GroupRequests({request}:any) {
    return (
        <li className="sidebarFriend">
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <span className="sidearFriendName">{request.name}</span>
                </Grid>
                <Grid item xs={1.5}>
                    <button onClick={() => console.log("Accepted")} style={{ border: "none", background: "none", padding: "0", font: "inherit", cursor: "pointer" }}>
                        <RxCheckCircled color={"green"} size={15}/>
                    </button>
                </Grid>
                <Grid item xs={1.5}>
                    <button onClick={() => console.log("Denied")} style={{ border: "none", background: "none", padding: "0", font: "inherit", cursor: "pointer" }}>
                        <RxCrossCircled color={"red"} size={15}/>
                    </button>
                </Grid>
            </Grid>
        </li>
    )
}