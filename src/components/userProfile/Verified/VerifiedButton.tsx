import {IconButton, Tooltip} from "@mui/material";
import {BiCheckShield} from "react-icons/bi";
import React from "react";

function VerifiedButton() {
    return (

        <Tooltip title="Verified">
            <IconButton>
                <BiCheckShield color={"#0C4C8A"} size={20}/>
            </IconButton>
        </Tooltip>
    );
}

export default VerifiedButton