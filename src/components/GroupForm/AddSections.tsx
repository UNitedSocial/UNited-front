import * as React from 'react';
import {useEffect, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {Button, TextField} from "@mui/material";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {SectionElement} from '../../interfaces/Groups/SectionElement';
import {postSections} from '../../backendConnection/Groups/postSections';
import {useParams} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import PreviewSections from "./PreviewSections";
import { handleDeleteSections } from '../../backendConnection/Groups/handleDeleteSections';

function AddSections(props: any) {

    let {sectionsProp, toogleNotification, toogleIsPosting, toogleSections, toogleUpdate} = props;
    let {groupname} = useParams();
    let {getAccessTokenSilently, isLoading} = useAuth0();

    const [formValues, setFormValues] = useState<string[]>([]);
    const [sections, setSections] = useState<SectionElement[]>(sectionsProp);
    const [PreviewMode, setPreviewMode] = useState<boolean>(false)
    const [textInput, settextInput] = useState<string[]>([])

    useEffect(() => {
        setSections(sectionsProp);
        setFormValues(sectionsProp.map((element: SectionElement) => {
            if (element.type === "title") {
                return "Titulo"
            } else if (element.type === "subtitle") {
                return "Subtítulo"
            } else if (element.type === "paragraph") {
                return "Texto"
            }
        }));
    }, [sectionsProp]);

    const [count, setCount] = useState(1);


    const handleChange = (e: SelectChangeEvent) => {
        setFormValues([...formValues, e.target.value as string])
        const newSection: SectionElement = {
            position: formValues.length,
            type: "",
            content: "",
            _id: ""
        }
        setSections([...sections, newSection])
        setPreviewMode(false)
        settextInput([...textInput, ''])
    };

    const formButtons = () => {
        if (formValues.length !== 0) {
            return (
                <Stack spacing={1} sx={{mt: 2}} direction="row">
                    <Button variant="contained"
                            onClick={async () => {
                                toogleIsPosting(true);
                                toogleSections(sections);
                                while (isLoading) {
                                    await new Promise(resolve => setTimeout(resolve, 100));
                                }
                                postSections(groupname, sections, getAccessTokenSilently)
                                    .then(() => {
                                        toogleNotification("Secciones guardadas correctamente", "success");
                                    })
                                    .catch(() => {
                                        toogleNotification("Error al guardar los cambios", "error")
                                    })
                                    .finally(() => {
                                        toogleIsPosting(false);
                                    })
                            }}>
                        Guardar Cambios
                    </Button>
                    <Button variant="contained" onClick={() => handlePreview()}>
                        Vista previa
                    </Button>
                    <Button variant="contained" onClick={() => handleCancel()}>
                        Cancelar
                    </Button>
                </Stack>
            )
        }
    }

    const handlePreview = () => {
        setPreviewMode(!PreviewMode)
    }

    const handleCancel = () => {
        setFormValues([])
        setSections([])
        settextInput([])
        setPreviewMode(false)
    }

    const handleRemove = async (index: number) => {
        toogleIsPosting(true);
        while(isLoading){
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        await handleDeleteSections(groupname, getAccessTokenSilently, sections[index].position)
            .then(() => {
                toogleNotification("Sección eliminada correctamente", "success");
                toogleUpdate();
            }).catch(() => {
                toogleNotification("Error al eliminar la sección", "error")
            }).finally(() => {
                toogleIsPosting(false);
            });
    }
    const handleChangeInput = (index: number, type: string, contenido: string) => {
        setCount(count + 1);
        sections[index] = {...sections[index], content: contenido};

        textInput[index] = contenido;
    }

    if (!PreviewMode) {
        return (
            <>
                <FormControl sx={{mt: 4, minWidth: 200}}>
                    <InputLabel>Agregar Sección</InputLabel>
                    <Select
                        labelId="boton_seccion"
                        id="botonSeccion"
                        value={""}
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
                    formValues.map((element: string, index: number) => {
                        if (element === 'Titulo')
                            return (
                                <Box sx={{
                                    border: 0,
                                    borderRadius: 2,
                                    width: '100%',
                                    bgcolor: '#EFECEB',
                                    mt: 2,
                                    fontSize: 32
                                }}
                                     key={sections[index]?._id === undefined ? sections[index].position : sections[index]?._id}>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ml: 1, mr: 1}}>

                                        <TextField
                                            type="text"
                                            fullWidth={true}
                                            label="Título"
                                            variant="outlined"
                                            sx={{m: 2, bgcolor: '#fafafa'}}
                                            value={sections[index].content}
                                            onChange={(newValue) => handleChangeInput(index, "title", newValue.currentTarget.value)}
                                        />
                                        <IconButton aria-label="delete" size="small"
                                                    onClick={() => handleRemove(index)}>
                                            <DeleteIcon fontSize="inherit"/>
                                        </IconButton>

                                    </Stack>
                                </Box>)
                        if (element === 'Subtítulo')
                            return (<Box sx={{border: 0, borderRadius: 2, width: '100%', bgcolor: '#EFECEB', mt: 2}}
                                         key={sections[index]?._id === undefined ? sections[index].position + index : sections[index]?._id + index}>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ml: 1, mr: 1}}>

                                        <TextField
                                            type="text"
                                            fullWidth={true}
                                            label="Subtítulo"
                                            variant="outlined"
                                            sx={{m: 2, bgcolor: '#fafafa'}}
                                            defaultValue={sections[index].content}
                                            onChange={(newValue) => handleChangeInput(index, "subtitle", newValue.currentTarget.value)}
                                        />

                                        <IconButton aria-label="delete" size="small"
                                                    onClick={() => handleRemove(index)}>
                                            <DeleteIcon fontSize="inherit"/>
                                        </IconButton>

                                    </Stack>
                                </Box>
                            )
                        if (element === 'Texto')
                            return (
                                <Box sx={{border: 0, borderRadius: 2, width: '100%', bgcolor: '#EFECEB', mt: 2}}
                                     key={sections[index]?._id === undefined ? sections[index].position + index : sections[index]?._id + index}>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ml: 1, mr: 1}}>

                                        <TextField
                                            label="Texto"
                                            multiline
                                            fullWidth={true}
                                            rows={4}
                                            sx={{m: 2, bgcolor: '#fafafa'}}
                                            defaultValue={sections[index].content}
                                            onChange={(newValue) => handleChangeInput(index, "paragraph", newValue.currentTarget.value)}
                                        />
                                        <IconButton aria-label="delete" size="small"
                                                    onClick={() => handleRemove(index)}>
                                            <DeleteIcon fontSize="inherit"/>
                                        </IconButton>

                                    </Stack>
                                </Box>
                            )
                        if (element === 'Imagenes')
                            return (
                                <Box sx={{border: 0, borderRadius: 2, width: '100%', bgcolor: '#EFECEB', mt: 2}}
                                     key={element + index}>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ml: 1, mr: 1}}>
                                        <>
                                            {() => handleChangeInput(index, "carrousel", "conjunto de imagenes correspondientes")}
                                            <Typography sx={{fontSize: 14, m: 2}} color="text.secondary" gutterBottom>
                                                Conjunto de imagenes (Guardar cambios para visualizar)
                                            </Typography>
                                            <IconButton aria-label="delete" size="small"
                                                        onClick={() => handleRemove(index)}>
                                                <DeleteIcon fontSize="inherit"/>
                                            </IconButton>
                                        </>
                                    </Stack>
                                </Box>
                            )
                        else
                            return null;
                    })

                }
                {formButtons()}

            </>
        )
    } else {
        return (
            <>
                <FormControl sx={{mt: 4, minWidth: 200}}>
                    <InputLabel>Agregar Sección</InputLabel>
                    <Select
                        labelId="boton_seccion"
                        id="botonSeccion"
                        value={""}
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
