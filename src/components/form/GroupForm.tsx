import * as React from 'react';

import "./groupForm.css"
import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";

import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

const options = [
    'Academico',
    'Deportivo',
    'Ocio',
    'Otro',
];


function GroupForm() {

    return (
        <Box maxWidth="xl" style={{position: 'relative'}}>
            <Typography variant="h5" sx={{mt: 2}}>CREACIÓN DE GRUPO</Typography>
            <Grid container spacing={2} sx={{mt: 2}}>
                <Grid item xs={4}>
                    <TextField
                        type="text"
                        fullWidth={true}
                        label="Nombre del grupo"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        type="text"
                        fullWidth={true}
                        label="Intereses"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Fecha de creación"
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                        },
                                    }}/>
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <FormControl fullWidth sx={{mt: 2}}>
                <InputLabel id="select-label">Tipo de grupo</InputLabel>
                <Select
                    labelId="select-label"
                    id="select"
                    label="Tipo de grupo"
                    value={""}
                >
                    {options.map((optionElement, idx) => (
                        <MenuItem key={idx} value={options[idx]}>{options[idx]}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Descripción"
                multiline
                fullWidth={true}
                rows={4}
                sx={{mt: 2}}
            />
            <Button variant="contained" sx={{mt: 2}} color="primary">
                Crear Grupo
            </Button>
            <br/>
        </Box>
    )
}

export default GroupForm;
