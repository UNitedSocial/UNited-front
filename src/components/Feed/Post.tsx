import "../../App.css";
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from "@mui/material";

interface Post {
    info: PostInfo;
}

interface PostInfo {
    name: string;
    description: string;
}

function Post(postElement: Post){

    const { info } = postElement;

    return (

        <Card sx={{ maxWidth: { xs: "60%", md: "35vw" } }} style={{background:"#EFECEB"}}>
          <CardMedia
            sx={{ height: 194 }}
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

export default Post
