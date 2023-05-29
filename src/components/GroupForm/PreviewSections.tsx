import React from "react";
import {SectionElement} from "../../interfaces/Groups/SectionElement";
import Stack from '@mui/material/Stack';
import {Card, Grid, Typography} from "@mui/material";

function PreviewSections({sections}: any) {

    if(sections.length === 0){
        return null;
    }

    return (
        <Card sx={{maxWidth: {xs: "60%", md: "100%"}, minHeight: "10em", mt: 2}} style={{background: "#EFECEB"}}
              variant="outlined">
            <Stack alignItems="center" spacing={2}>
                <Grid container sx={{marginTop: 2, marginBottom: 1}}>
                    {
                        sections.map((element: SectionElement, index: number) => {
                            if (element.type === 'title')
                                return (<>
                                    <Grid xs={12} key={element.type + element.content}>
                                        <Typography variant="h3" color="black"
                                                    sx={{marginLeft: 4, marginRight: 4, marginTop: 1}}>
                                            {element.content}
                                        </Typography>
                                    </Grid>

                                </>)
                            if (element.type === 'subtitle')
                                return <>
                                    <Grid xs={12} key={element.type + element.content}>
                                        <Typography variant="h5" color="black"
                                                    sx={{marginLeft: 4, marginRight: 4, marginTop: 1}}>
                                            {element.content}
                                        </Typography>
                                    </Grid>

                                </>
                            if (element.type === 'paragraph')
                                return <>
                                    <Grid xs={12} key={element.type + element.content}>
                                        <Typography variant="subtitle1" color="black" paragraph
                                                    sx={{marginLeft: 4, marginRight: 4, marginTop: 1}}>
                                            {element.content}
                                        </Typography>
                                    </Grid>
                                </>

                            if (element.type === 'carrousel')
                                return <>
                                    <Grid xs={12}>
                                        <Typography variant="subtitle1" color="black" paragraph
                                                    sx={{marginLeft: 4, marginRight: 4, marginTop: 1}}>
                                            Conjunto de imagenes
                                        </Typography>
                                    </Grid>
                                </>

                            else return null

                        })
                    }
                </Grid>
            </Stack>
        </Card>
    )

}

export default PreviewSections;
