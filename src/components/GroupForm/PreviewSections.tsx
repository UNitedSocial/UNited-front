import React from "react";
import {SectionElement} from "../../interfaces/Groups/SectionElement";
import Stack from '@mui/material/Stack';
import {Card, Grid, Typography} from "@mui/material";

function PreviewSections({sections}: any) {

    return (
        <Card sx={{maxWidth: {xs: "60%", md: "100%"}, minHeight: "10em", mt: 2}} style={{background: "#EFECEB"}}
              variant="outlined">
            <Stack alignItems="center" spacing={2}>
                <Grid container sx={{marginTop: 2, marginBottom: 1}}>
                    {
                        sections.map((element: SectionElement, index: number) => {
                            if (element.type === 'title' && index === element.position)
                                return (<>
                                    <Grid xs={12}>
                                        <Typography variant="h3" color="black"
                                                    sx={{marginLeft: 2, marginRight: 2, marginTop: 1}}>
                                            {element.content}

                                        </Typography>
                                    </Grid>

                                </>)
                            if (element.type === 'subtitle' && index === element.position)
                                return <>
                                    <Grid xs={12}>
                                        <Typography variant="h5" color="black"
                                                    sx={{marginLeft: 2, marginRight: 2, marginTop: 1}}>
                                            {element.content}
                                        </Typography>
                                    </Grid>

                                </>
                            if (element.type === 'paragraph' && index === element.position)
                                return <>
                                    <Grid xs={12}>
                                        <Typography variant="subtitle1" color="black" paragraph
                                                    sx={{marginLeft: 2, marginRight: 2, marginTop: 1}}>
                                            {element.content}
                                        </Typography>
                                    </Grid>
                                </>

                            if (element.type === 'carrousel' && index === element.position)
                                return <>
                                    <Grid xs={12}>
                                        <Typography variant="subtitle1" color="black" paragraph
                                                    sx={{marginLeft: 2, marginRight: 2, marginTop: 1}}>
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
