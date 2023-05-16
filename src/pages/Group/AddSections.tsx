import { useState} from 'react';
import * as React from "react";
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
import { SectionElement } from '../../interfaces/Groups/SectionElement';
import { postSections } from '../../backendConnection/Groups/postSections';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import PreviewSections from './PreviewSections';

function AddSections (){

    let {groupname} = useParams();
    let {getAccessTokenSilently, user} = useAuth0();
    const location = useLocation();
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState<string[]>([])
    const [sections, setSections] = useState<SectionElement[]>([])
    const [PreviewMode, setPreviewMode] = useState<boolean>(false)
    const [textInput,settextInput] = useState<string[]>([])

    
    const [count, setCount] = useState(0)

    

    const handleChange = (e: SelectChangeEvent) =>{
        setFormValues([...formValues, e.target.value as string ])
        const newSection:SectionElement = {
            position: formValues.length,
            type : "",
            content : ""
        }
        setSections([...sections, newSection])
        setPreviewMode(false)
        settextInput([...textInput,''])

    };

    const formButtons = () =>{
        if (formValues.length !== 0 && PreviewMode == false){
            return <>
                 <Stack spacing={1} direction="row">
                 <Button variant="contained"  onClick={() => postSections(groupname,sections, getAccessTokenSilently).then(() => {
                            /*
                            const queryParams = new URLSearchParams(location.search);
                            queryParams.set("state", "");
                            navigate({search: queryParams.toString()});
                            */
                        })}>
                    Guardar Cambios
                </Button>
                <Button variant="contained" onClick={()=>handlePreview()}>
                    Vista previa
                </Button>
                <Button variant="contained"  onClick={()=>handleCancel()}>
                    Cancelar
                </Button>
                </Stack>
                
            </>
        }else if (PreviewMode == true){
            return <>
                 <Stack spacing={1} direction="row">
                 <Button variant="contained"  onClick={() => postSections(groupname,sections, getAccessTokenSilently).then(() => {
                            /*
                            const queryParams = new URLSearchParams(location.search);
                            queryParams.set("state", "");
                            navigate({search: queryParams.toString()});
                            */
                        })}>
                    Guardar Cambios
                </Button>                
                <Button variant="contained"  onClick={()=>handleCancel()}>
                    Cancelar
                </Button>
                </Stack>
                
            </>
        }
    }

    
    const handlePreview = ()=>{
        setPreviewMode(!PreviewMode)        
    }

    const handleCancel = () =>{
        setFormValues([])
        setSections([])
        settextInput([])
        setPreviewMode(false)
    }

    const handleRemove = (index: number) =>{
        const list_form = [...formValues]
        const list_inputs = [...sections]
        const list_inputs_texts = [...textInput]
        list_form.splice(index,1)
        list_inputs.splice(index,1)
        list_inputs_texts.splice(index,1)
        setFormValues(list_form)
        setSections(list_inputs)
        settextInput(list_inputs_texts)
    }
    const handleChangeInput = (index:number,type:string,contenido:string) =>{
        setCount(count+1);
        const texto = sections[index].content + contenido
        const modSection:SectionElement = {
            position: index,
            type: type,
            content: contenido
        }
        sections[index] = modSection;       
        
        textInput[index]= contenido;
        
        console.log(textInput[index])


    }
    if (PreviewMode === false){
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
                    formValues.map((element: string, index:number) =>{
                        if(element === 'Titulo')
                        return<>
                        <Box sx={{border:1,borderRadius: 2,width: '100%', bgcolor: '#f5f5f5', m:2,fontSize:32}}>
                        <Stack direction="row" alignItems="center" spacing={1}>          
                        
                            <TextField
                                type="text"
                                fullWidth={true}
                                label="Título"
                                variant="outlined"
                                value={textInput[index]}                                
                                sx = {{m:2, bgcolor: '#fafafa'}}
                                onChange={(newValue)=>handleChangeInput(index,"title",newValue.currentTarget.value)}
                            /> 
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
                                value={textInput[index]}  
                                sx = {{m:2, bgcolor: '#fafafa'}}
                                onChange={(newValue)=>handleChangeInput(index,"subtitle",newValue.currentTarget.value)}
                            /> 
                            
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
                                value={textInput[index]}  
                                sx = {{m:2, bgcolor: '#fafafa'}}
                                onChange={(newValue)=>handleChangeInput(index,"paragraph",newValue.currentTarget.value)}
                            /> 
                            <IconButton aria-label="delete" size="small" onClick={()=>handleRemove(index)}>
                            <DeleteIcon fontSize="inherit" />
                            </IconButton>
                        
                        </Stack>
                        </Box>
                        </>                       
                        
                        if(element === 'Imagenes')
                        return <>
                            {handleChangeInput(index,"carrousel","conjunto de imagenes correspondientes")}
                            <Box sx={{border: 1,borderRadius: 2,width: '100%', bgcolor: '#eeeeee',m:2}}>
                            <Stack direction="row" alignItems="center" spacing={1}>  
                            <Typography sx={{ fontSize: 14 , m:2}} color="text.secondary" gutterBottom>
                                Conjunto de imagenes (Guardar cambios para visualizar)
                            </Typography> 
                            <IconButton aria-label="delete" size="small" onClick={()=>handleRemove(index)}>
                            <DeleteIcon fontSize="inherit" />
                            </IconButton>
                            </Stack>

                        </Box> 
                        </>
                        
                        
                        
                    })
                    
                }
                {formButtons()}           
                
            </>
        )
        }else{
            return(
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
                    <PreviewSections sections={sections}/>
                    {formButtons()}
                </>
            )
        }
}

export default AddSections;