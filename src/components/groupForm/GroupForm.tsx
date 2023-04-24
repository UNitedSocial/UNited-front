import * as React from "react";
import {useState} from "react";

import "./groupForm.css"
import {
    Alert,
    AlertColor,
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Chip,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";

import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useAuth0} from "@auth0/auth0-react";
import {BsFacebook, BsInstagram, BsLinkedin, BsTwitter, BsYoutube} from "react-icons/bs";
import {postGroup} from "../../backendConnection/postGroup";
import {isValidEmail} from "../../validations/isValidEmail";
import {isValidPhoneNumber} from "../../validations/isValidPhoneNumber";

const options = ["Académico", "Deportivo", "Ocio", "Otro",];

const clasifications = ["Semillero", "Grupo estudiantil", "Proyecto estudiantil"];

const topicOptions = ["Ingeniería"];

interface GroupElement {
    username: string;
    group: {
        info: {
            name: string;
            description: string;
            contact: {
                mail: string;
                page: string;
                cellphone: string;
                socialNetworks: {
                    facebook: string;
                    instagram: string;
                    linkedin: string;
                    twitter: string;
                    youtube: string;
                };
            };
            topics: string[];
            classification: string;
            isRecognized: boolean;
            recognizedInfo?: {
                type?: string | undefined;
                faculty?: string | undefined;
                department?: string | undefined;
                mainProfessor?: string | undefined;
            };
            fundationDate: string | null;
            referenceImg: string;
        };
    };
}


function GroupForm() {

    const newGroupElement: GroupElement = {
        username: "i1",
        group: {
            info: {
                name: "",
                description: "",
                contact: {
                    mail: "",
                    page: "",
                    cellphone: "",
                    socialNetworks: {
                        facebook: "",
                        instagram: "",
                        linkedin: "",
                        twitter: "",
                        youtube: ""
                    }
                },
                topics: [],
                classification: "",
                isRecognized: false,
                recognizedInfo: {
                    type: "",
                    faculty: "",
                    department: "",
                    mainProfessor: ""
                },
                fundationDate: null,
                referenceImg: "https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg"
            }
        }
    }

    const {getAccessTokenSilently} = useAuth0();
    const [isPosting, setIsPosting] = useState(false)
    const [groupElement, setGroupElement] = useState<GroupElement>({...newGroupElement});
    const [openNotification, setOpenNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationSeverity, setNotificationSeverity] = useState<AlertColor>("info");

    const notify = (message: string, severity: AlertColor) => {
        setNotificationMessage(message);
        setNotificationSeverity(severity);
        setOpenNotification(true);
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenNotification(false);
    };


    /*useEffect(() => {
        setGroupElement({...groupElement, username: user?.email})
    }, [isLoading, user]);*/

    function handleChangeInfo(page: string, value: string | boolean | null) {
        setGroupElement({
            ...groupElement, group: {
                ...groupElement.group,
                info: {...groupElement.group.info, [page]: value}
            }
        })
    }

    function handleChangeRecognizedInfo(page: string, value: string | boolean | null) {
        setGroupElement(
            {
                ...groupElement,
                group: {
                    ...groupElement.group,
                    info: {
                        ...groupElement.group.info,
                        recognizedInfo: {...groupElement.group.info.recognizedInfo, [page]: value}
                    }
                }
            })
    }

    function handleChangeContact(page: string, value: string | boolean | null) {
        setGroupElement(
            {
                ...groupElement,
                group: {
                    ...groupElement.group,
                    info: {
                        ...groupElement.group.info,
                        contact: {...groupElement.group.info.contact, [page]: value}
                    }
                }
            })
    }

    function handleChangeSocialNetworks(page: string, value: string | boolean | null) {
        setGroupElement(
            {
                ...groupElement,
                group: {
                    ...groupElement.group,
                    info: {
                        ...groupElement.group.info,
                        contact: {
                            ...groupElement.group.info.contact,
                            socialNetworks: {...groupElement.group.info.contact.socialNetworks, [page]: value}
                        }
                    }
                }
            })
    }

    /*function handleImageChange(event: any) {

        setGroupElement({
            ...groupElement, group: {
                ...groupElement.group,
                info: {
                    ...groupElement.group.info, referenceImg:
                        {
                            preview: URL.createObjectURL(event.target.files[0]),
                            raw: event.target.files[0]
                        }
                }
            }
        });

    }*/


    if (isPosting) {
        return (
            <>
                <Box
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                >
                    <CircularProgress size={70}
                                      sx={{color: "#0c4c8a"}}/>
                </Box>
            </>
        )
    }

    return (<Box maxWidth="xl" style={{position: "relative"}}>

        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Typography variant="h5" sx={{mt: 2}}>Crear grupo</Typography>
            </Grid>
            <Grid item xs={4}>
                <FormControlLabel sx={{mt: 2}} control={<Checkbox checked={groupElement.group.info.isRecognized}
                                                                  style={{color: "#2d2a26"}}
                                                                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                      handleChangeInfo("isRecognized", event.target.checked);
                                                                  }}/>}
                                  label="Grupo reconocido"/>
            </Grid>
            <Grid item xs={4}>
            </Grid>
        </Grid>

        <Grid container spacing={2} sx={{mt: 2}}>
            <Grid item xs={4}>
                <TextField
                    type="text"
                    fullWidth={true}
                    label="Nombre del grupo"
                    variant="outlined"
                    error={groupElement.group.info.name === ""}
                    helperText={groupElement.group.info.name === "" ? "El nombre del grupo no puede estar vacío" : ""}
                    value={groupElement.group.info.name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeInfo("name", event.target.value);
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Fecha de fundación"
                                value={groupElement.group.info.fundationDate}
                                onChange={(newValue) => handleChangeInfo("fundationDate", newValue)}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                    },
                                }}/>
                </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel id="select-label">Clasificación</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        label="Clasificación"
                        value={groupElement.group.info.classification}
                        onChange={(newValue) => handleChangeInfo("classification", newValue.target.value)}
                    >
                        {options.map((optionElement, idx) => (
                            <MenuItem key={idx} value={options[idx]}>{options[idx]}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>

        {groupElement.group.info.isRecognized ?
            <Grid container spacing={2} sx={{mt: 2}}>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="clasificacion-label">Clasificación</InputLabel>
                        <Select
                            labelId="clasificacion-label"
                            id="clasificacion"
                            label="Clasificación"
                            value={groupElement.group.info.recognizedInfo?.type}
                            onChange={(newValue) => handleChangeRecognizedInfo("type", newValue.target.value)}
                        >
                            {clasifications.map((clasificationElement, idx) => (
                                <MenuItem key={idx} value={clasifications[idx]}>{clasifications[idx]}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        type="text"
                        fullWidth={true}
                        label="Facultad"
                        variant="outlined"
                        value={groupElement.group.info.recognizedInfo?.faculty}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            handleChangeRecognizedInfo("faculty", event.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        type="text"
                        fullWidth={true}
                        label="Departamento"
                        variant="outlined"
                        value={groupElement.group.info.recognizedInfo?.department}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            handleChangeRecognizedInfo("department", event.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        type="text"
                        fullWidth={true}
                        label="Profesor"
                        variant="outlined"
                        value={groupElement.group.info.recognizedInfo?.mainProfessor}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            handleChangeRecognizedInfo("mainProfessor", event.target.value);
                        }}
                    />
                </Grid>
            </Grid>
            : null}

        <Grid container spacing={2} sx={{mt: 2}}>
            <Grid item xs={12}>
                <TextField
                    label="Descripción"
                    multiline
                    fullWidth={true}
                    rows={4}
                    error={groupElement.group.info.description.length < 15}
                    helperText={groupElement.group.info.description.length < 15 ? "El campo de descripción debe tener al menos 15 caracteres" : ""}
                    value={groupElement.group.info.description}
                    onChange={(newValue) => handleChangeInfo("description", newValue.target.value)}
                />
            </Grid>
        </Grid>

        <Grid container spacing={2} sx={{mt: 2}}>
            <Grid item xs={12}>
                <Autocomplete
                    multiple
                    options={topicOptions}
                    freeSolo
                    renderTags={(value: readonly string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                            <Chip variant="outlined" label={option} {...getTagProps({index})} />
                        ))
                    }

                    value={groupElement.group.info.topics}
                    onChange={(event: any, newValue: any) => {
                        handleChangeInfo("topics", newValue)

                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Topics"
                            placeholder="Topics"
                        />
                    )}
                />
            </Grid>
        </Grid>

        <Grid container spacing={2} sx={{mt: 2}}>
            <Grid item xs={4}>
                <TextField
                    type="text"
                    fullWidth={true}
                    label="Correo"
                    variant="outlined"
                    error={groupElement.group.info.contact.mail === ""}
                    helperText={groupElement.group.info.contact.mail === "" ? "El correo es obligatorio" : ""}
                    value={groupElement.group.info.contact.mail}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeContact("mail", event.target.value);
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    type="text"
                    fullWidth={true}
                    label="Página web"
                    variant="outlined"
                    value={groupElement.group.info.contact.page}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeContact("page", event.target.value);
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    type="text"
                    fullWidth={true}
                    label="Teléfono"
                    variant="outlined"
                    error={groupElement.group.info.contact.cellphone === ""}
                    helperText={groupElement.group.info.contact.cellphone === "" ? "El Telefono es obligatorio" : ""}
                    value={groupElement.group.info.contact.cellphone}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeContact("cellphone", event.target.value);
                    }}
                />
            </Grid>
        </Grid>

        <Grid container spacing={2} sx={{mt: 2}}>
            <Grid item xs={4}>
                <TextField
                    type="text"
                    fullWidth={true}
                    variant="outlined"
                    value={groupElement.group.info.contact.socialNetworks.facebook}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeSocialNetworks("facebook", event.target.value);
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <BsFacebook/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    type="text"
                    fullWidth={true}
                    variant="outlined"
                    value={groupElement.group.info.contact.socialNetworks.instagram}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeSocialNetworks("instagram", event.target.value);
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <BsInstagram/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    type="text"
                    fullWidth={true}
                    variant="outlined"
                    value={groupElement.group.info.contact.socialNetworks.linkedin}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeSocialNetworks("linkedin", event.target.value);
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <BsLinkedin/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
        </Grid>

        <Grid container spacing={2} sx={{mt: 2}}>
            <Grid item xs={4}>
                <TextField
                    type="text"
                    fullWidth={true}
                    variant="outlined"
                    value={groupElement.group.info.contact.socialNetworks.twitter}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeSocialNetworks("twitter", event.target.value);
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <BsTwitter/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    type="text"
                    fullWidth={true}
                    variant="outlined"
                    value={groupElement.group.info.contact.socialNetworks.youtube}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeSocialNetworks("youtube", event.target.value);
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <BsYoutube/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={4}>
            </Grid>
        </Grid>

        {/*
        IMAGE HANDLER

        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5" sx={{mt: 2}}>Subir imagen del grupo</Typography>
            </Grid>
        </Grid>

        <Grid container spacing={2} sx={{mt: 0}}>
            <Grid item xs={12}>
                <label htmlFor="image-input">
                    <InputBase
                        id="image-input"
                        type="file"
                        onChange={handleImageChange}
                        inputProps={{accept: 'image/*'}}
                        sx={{
                            display: 'none',
                        }}
                    />
                    <img
                        src={groupElement.group.info.referenceImg.raw.size === 0
                            ? 'https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg'
                            : groupElement.group.info.referenceImg.preview}
                        alt="Da click para subir una imagen"
                        style={{width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 1, cursor: 'pointer'}}
                    />
                </label>
            </Grid>
        </Grid>*/}

        <Button variant="contained" sx={{mt: 4}} color="primary"
                onClick={() => handleSubmit().then(() => handleSuccess()).catch(e => handleSubmitError(e))}>
            Crear Grupo
        </Button>

        <Snackbar open={openNotification} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={notificationSeverity} sx={{width: "100%"}}>
                <div style={{whiteSpace: "pre-line"}}>{notificationMessage}</div>
            </Alert>
        </Snackbar>
        <br/>
    </Box>)

    async function handleSubmit() {

        let error = false;

        if (isPosting) {
            return Promise.reject("Already handling request");
        }

        setIsPosting(true);

        let errorArray: string[] = [];

        if (groupElement.group.info.name === "") {
            errorArray.push("El nombre es obligatorio");
        }

        if (groupElement.group.info.contact.cellphone === "") {
            errorArray.push("El teléfono es obligatorio");
        } else {
            if (!(isValidPhoneNumber(groupElement.group.info.contact.cellphone))) {
                errorArray.push("El teléfono no es válido");
            }
        }

        if (groupElement.group.info.contact.mail === "") {
            errorArray.push("El correo es obligatorio");
        } else {
            if (!(isValidEmail(groupElement.group.info.contact.mail))) {
                errorArray.push("El correo no es válido");
            }
        }

        if (groupElement.group.info.description.length < 15) {
            errorArray.push("La descripción debe tener al menos 15 caracteres");
        }

        if (errorArray.length === 0) {
            if (!groupElement.group.info.isRecognized) {
                delete groupElement.group.info.recognizedInfo;
            }

            await postGroup(groupElement, getAccessTokenSilently);
        } else {
            throw new Error(errorArray.join("\n"));
        }
    }

    function handleSuccess() {
        setIsPosting(false);
        setGroupElement({...newGroupElement});
        notify("Grupo creado exitosamente", "success");
    }

    function handleSubmitError(e: any) {
        setIsPosting(false);
        if (e?.response?.data?.message === undefined) {
            notify(e?.message, "error");
        } else {
            notify(e?.response?.data?.message, "error");
        }
    }
}

export default GroupForm;
