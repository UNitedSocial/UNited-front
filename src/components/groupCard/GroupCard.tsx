import "../../App.css";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

interface Group {
    info: GroupInfo;
}

interface GroupInfo {
    name: string;
    description: string;
    referenceImg: string;
}

function GroupCard(groupElement: Group) {

    const {info} = groupElement;

    return (

        <Card sx={{maxWidth: {xs: "60%", md: "50vw"}}} style={{background: "#EFECEB"}} variant="outlined">
            <Link to={"/group/" + info?.name}>
                <CardMedia
                    sx={{height: 194}}
                    image={info.referenceImg}
                    title="Grupo Unal"
                />
            </Link>
            <CardContent>
                <Link to={"/group/" + info?.name} className={"linkFormatText"}>
                    <Typography gutterBottom variant="h5" component="div">
                        {info.name}
                    </Typography>
                </Link>
                <Typography variant="body2" color="text.secondary">
                    {info.description}
                </Typography>
            </CardContent>
        </Card>);

}

export default GroupCard
