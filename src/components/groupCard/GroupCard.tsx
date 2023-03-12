import "../../App.css";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

interface Group {
    info: GroupInfo;
}

interface GroupInfo {
    name: string;
    description: string;
}

function GroupCard(groupElement: Group) {

    const {info} = groupElement;

    return (

        <Card sx={{maxWidth: {xs: "60%", md: "35vw"}}} style={{background: "#EFECEB"}}>
            <CardMedia
                sx={{height: 194}}
                image="https://picsum.photos/200/300?random=1"
                title="Grupo Unal"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {info.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {info.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Unete</Button>
            </CardActions>
        </Card>
    );

}

export default GroupCard
