import React from "react";
import { SectionElement } from "../../interfaces/Groups/SectionElement";
import Stack from '@mui/material/Stack';
import {Box, Grid, Paper, Typography} from "@mui/material";

function PreviewSections({sections}:any){ 
     
    return(
        <>
        <Box sx={{border:1,borderRadius: 2,width: '100%', bgcolor: '#f5f5f5', m:2,fontSize:32}}>
        <Stack alignItems="center" spacing={2}>
        <Grid container>
        {
        sections.map((element: SectionElement, index:number) =>{
            if(element.type === 'title' && index == element.position)
            return(<>
                <Grid xs={12}>                   
                <Typography variant="h3" color="black" gutterBottom sx={{m:2}}>
                    {element.content}
                    
                </Typography>  
                </Grid>     
            
            </>) 
            if(element.type === 'subtitle'  && index === element.position) 
            return<>  
                <Grid xs={12}>                  
                <Typography variant="h5" color="black" gutterBottom sx={{m:2}}>
                    {element.content}
                </Typography> 
                </Grid>
                
            </>  
            if(element.type === 'paragraph' && index === element.position)
            return<>
                <Grid xs={12}>
                <Typography variant="subtitle1" color="black" paragraph sx={{m:2}}>
                    {element.content}
                </Typography>
                </Grid>
            </>                       
                
            if(element.type === 'carrousel' && index === element.position)
            return <>
                <Grid xs={12}>
                <Typography variant="subtitle1" color="black" paragraph sx={{m:2}}>
                    Conjunto de imagenes 
                </Typography>
                </Grid>
            </> 
            
            
        })           
        }
        </Grid>
        </Stack>
        </Box>
        </>
    )
    
}

export default PreviewSections;