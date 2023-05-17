import {Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";
import {formatDate} from "../../../../functions/formatDate";
import RecognizedButton from "./RecognizedButton";
import MembersButton from "./MembersButton";

interface Group {
    info: GroupInfo;
}

interface GroupInfo {
    name: string;
    description: string;
    referenceImg: string;
    creationDate: string;
    clasification: string;
    numberOfMembers: string;
    isRecognized: boolean;
}

export default function GroupCardSmall(groupElement: Group) {

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
                    <Grid container sx={{marginBottom: 0.5}}>
                        <Grid item xs={10.5}>
                            <Typography variant="h5" component="span">
                                {info.name}
                            </Typography>
                            <Typography gutterBottom variant="subtitle2" component="span" style={{marginLeft: '1em'}}>
                                {formatDate(info.creationDate)} - {info.clasification}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <MembersButton number={info.numberOfMembers}/>
                        </Grid>
                        <Grid item xs={0.5}>
                            {info.isRecognized ?
                            <RecognizedButton/> : null}
                        </Grid>
                    </Grid>
                </Link>
                <Typography variant="body2" color="text.secondary">
                    {info.description}
                </Typography>
            </CardContent>
        </Card>);

}
