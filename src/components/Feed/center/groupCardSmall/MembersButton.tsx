import {IconButton, Tooltip} from "@mui/material";
import React from "react";
import {GrGroup} from "react-icons/gr";

export default function MembersButton(props: any) {

    const {number} = props;

    return (
        <Tooltip title={number + " members"}>
            <IconButton>
                <>
                    {number}
                    <GrGroup color={"#000000"} size={20}/>
                </>
            </IconButton>
        </Tooltip>
    );

}