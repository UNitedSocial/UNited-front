import {Alert, AlertTitle, Box, Grid, Stack} from "@mui/material";
import React from "react";
import UtilityMenu from "../../components/UtilityMenu/UtilityMenu";

export default function ErrorMessage(props: any) {

    return (

        <Grid container>
            <Grid item xs={3}>
                <Grid container justifyContent="center">
                    <></>
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <Box maxWidth="false" style={{position: "relative"}}>

                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={5}
                        sx={{width: "100%"}}>
                        <Alert severity="error" sx={{width: "100%"}}>
                            <AlertTitle>Error</AlertTitle>
                            Hubo un error, por favor intente de nuevo
                        </Alert>
                    </Stack>

                </Box>
            </Grid>

            <Grid item xs={3}>
                <Grid container justifyContent="center">
                    <UtilityMenu/>
                </Grid>
            </Grid>
        </Grid>

    )

}