import {IconButton, Tooltip} from "@mui/material";
import React from "react";
import {TbCircleLetterR} from "react-icons/tb";

export default function RecognizedButton(props: any) {

    return (
        <Tooltip title="Recognized">
            <IconButton>
                <TbCircleLetterR color={"#000000"} size={25}/>
            </IconButton>
        </Tooltip>
    );

}