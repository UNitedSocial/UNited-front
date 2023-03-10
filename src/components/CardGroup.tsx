import "../App.css"
import {Card,
CardActions,
CardContent,
CardMedia,
Button,
Typography} from "@mui/material"

function CardGroup(){
    return (
        
        <Card sx={{ maxWidth: 600 }} style={{background:"#EFECEB"}}>
          <CardMedia
            sx={{ height: 140 }}
            image="https://picsum.photos/200/300?random=1"
            title="Grupo Unal"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Nombre del grupo
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Descripción breve del grupo. Invitamos a la comunidad universitaria
              a compartir su gusto por los juegos de rol y la literatura de fantasía.
            </Typography>
          </CardContent>
          <CardActions>            
            <Button size="small">Unete</Button>
          </CardActions>
        </Card>
      );

}

export default CardGroup