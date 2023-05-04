import React, { useState} from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {Button,TextField} from "@mui/material";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function GroupSectionCreationTemplate (){
    const [formValues, setFormValues] = useState<string[]>([])

    const handleChange = (e: SelectChangeEvent) =>{
        setFormValues([...formValues, e.target.value as string ])
    };

    const formButtons = () =>{
        if (formValues.length !== 0){
            return <>
                <Button>
                    Guardar Cambios
                </Button>
                <Button onClick={()=>handleCancel()}>
                    Cancelar
                </Button>
            </>
        }
    }

    const handleCancel = () =>{
        setFormValues([])
    }

    const handleRemove = (index: number) =>{
        const list = [...formValues]
        list.splice(index,1)
        setFormValues(list)
    }

    return (
        <>
            <FormControl sx={{ m: 2, minWidth: 200}}>
            <InputLabel>Agregar Sección</InputLabel>
                <Select
                labelId="boton_seccion"
                id="botonSeccion"
                value={"seccion"}
                label="Agregar Sección"
                onChange={handleChange}
                autoWidth                
                >
                <MenuItem value={"Titulo"}>Título</MenuItem>
                <MenuItem value={"Subtítulo"}>Subtítulo</MenuItem>
                <MenuItem value={"Texto"}>Texto</MenuItem>
                <MenuItem value={"Imagenes"}>Imagenes</MenuItem>
                </Select>
            </FormControl>
            {
                formValues.map((element: string, index) =>{
                    if(element === 'Titulo')
                    return<>
                    <Box sx={{border:1,borderRadius: 2,width: '100%', bgcolor: '#f5f5f5', m:2,fontSize:32}}>
                    <Stack direction="row" alignItems="center" spacing={1}>          
                    
                        <TextField
                            type="text"
                            fullWidth={true}
                            label="Título"
                            variant="outlined"
                            sx = {{m:2, bgcolor: '#fafafa'}}/> 
                        <IconButton aria-label="delete" size="small" onClick={()=>handleRemove(index)}>
                        <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    
                    </Stack>
                    </Box>
                    </> 
                    if(element === 'Subtítulo') 
                    return<>
                    <Box sx={{border:1,borderRadius: 2,width: '100%', bgcolor: '#f5f5f5', m:2}}>
                    <Stack direction="row" alignItems="center" spacing={1}>          
                    
                        <TextField
                            type="text"
                            fullWidth={true}
                            label="Subtítulo"
                            variant="outlined"
                            sx = {{m:2, bgcolor: '#fafafa'}}/> 
                        <IconButton aria-label="delete" size="small" onClick={()=>handleRemove(index)}>
                        <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    
                    </Stack>
                    </Box>
                    </>  
                    if(element === 'Texto')
                    return<>
                    <Box sx={{border:1,borderRadius: 2,width: '100%', bgcolor: '#f5f5f5',m:2}}>
                    <Stack direction="row" alignItems="center" spacing={1}>       
                    
                        <TextField
                            label="Texto"
                            multiline
                            fullWidth={true}
                            rows={4}
                            sx = {{m:2, bgcolor: '#fafafa'}}
                        /> 
                        <IconButton aria-label="delete" size="small" onClick={()=>handleRemove(index)}>
                        <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    
                    </Stack>
                    </Box>
                    </>                       
                     
                    if(element === 'Imagenes')
                    return <Box sx={{border: 1,borderRadius: 2,width: '100%', bgcolor: '#eeeeee',m:2}}>
                        <Stack direction="row" alignItems="center" spacing={1}>  
                        <Typography sx={{ fontSize: 14 , m:2}} color="text.secondary" gutterBottom>
                             Conjunto de imagenes (Guardar cambios para visualizar)
                        </Typography> 
                        <IconButton aria-label="delete" size="small" onClick={()=>handleRemove(index)}>
                        <DeleteIcon fontSize="inherit" />
                        </IconButton>
                        </Stack>

                    </Box> 
                    
                    
                    
                })
                
            }
            {formButtons()}           
            
        </>
    )
}

export default GroupSectionCreationTemplate;