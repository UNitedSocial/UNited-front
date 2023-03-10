import CardGroup from "./CardGroup";
import {styled} from "@mui/material/styles"
import {Box,Paper,Grid} from "@mui/material"

function GroupList(){
    return (
        <>
        
        <Grid container 
        direction="column"
        justifyContent="center"
        alignItems="center"
        rowSpacing={5} 
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}> 
        <Grid item>
            <CardGroup/>
        </Grid>
        <Grid item>
            <CardGroup/>
        </Grid>
        <Grid item>
            <CardGroup/>
        </Grid>
        
    

        </Grid>
        
        
        </>
    )
}

export default GroupList