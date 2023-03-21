import * as React from 'react';
import {useEffect, useState} from 'react';

import "./groupForm.css"
import {
    Alert,
    Autocomplete,
    Box,
    Button, Checkbox, Chip, CircularProgress,
    FormControl, FormControlLabel,
    Grid, InputAdornment,
    InputLabel,
    MenuItem,
    Select, Snackbar,
    TextField,
    Typography
} from "@mui/material";

import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {useAuth0} from "@auth0/auth0-react";
import {BsFacebook, BsInstagram, BsLinkedin, BsTwitter, BsYoutube} from "react-icons/bs";
import axios from "axios";

const options = ['Académico', 'Deportivo', 'Ocio', 'Otro',];

const topicOptions = ['Ingeniería'];

function GroupForm() {

    const {user, isAuthenticated, getAccessTokenSilently, isLoading} = useAuth0();
    const [isPosting, setIsPosting] = useState(false)
    const [groupElement, setGroupElement] = useState({
        username: user?.email, group: {
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
                referenceImg: "https://www.conexionverde.com/storage/2012/11/grupos-estudiantiles-gpg.jpg"
            }
        }
    });
    const [openNotification, setOpenNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenNotification(false);
    };

    const formattedOptions = options.map((option, idx) => ({
        label: option,
        id: idx + 1,
    }));


    useEffect(() => {
        setGroupElement({...groupElement, username: user?.email})
    }, [isLoading, user]);

    function handleChangeInfo(page: string, value: string | boolean | null) {
        setGroupElement({...groupElement, group: {...groupElement.group,
                info: {...groupElement.group.info, [page]: value}}})
    }

    function handleChangeRecognizedInfo(page: string, value: string | boolean | null) {
        setGroupElement(
            {...groupElement,
                group: {...groupElement.group,
                    info: {...groupElement.group.info,
                        recognizedInfo: {...groupElement.group.info.recognizedInfo, [page] : value}}}})
    }

    function handleChangeContact(page: string, value: string | boolean | null) {
        setGroupElement(
            {...groupElement,
                group: {...groupElement.group,
                    info: {...groupElement.group.info,
                        contact: {...groupElement.group.info.contact, [page] : value}}}})
    }

    function handleChangeSocialNetworks(page: string, value: string | boolean | null) {
        setGroupElement(
            {...groupElement,
                group: {...groupElement.group,
                    info: {...groupElement.group.info,
                        contact: {...groupElement.group.info.contact,
                            socialNetworks : {...groupElement.group.info.contact.socialNetworks, [page] : value}}}}})
    }

    if (isPosting) {
        return (
            <>
                <Box
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <CircularProgress size={70}
                                      sx={{color: '#0c4c8a'}}/>
                </Box>
            </>
        )
    }

    return (<Box maxWidth="xl" style={{position: 'relative'}}>

        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Typography variant="h5" sx={{mt: 2}}>Crear grupo</Typography>
            </Grid>
            <Grid item xs={4}>
                <FormControlLabel sx={{mt: 2}} control={<Checkbox checked={groupElement.group.info.isRecognized}
                                                     style={{color: '#2d2a26'}}
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
                    <TextField
                        type="text"
                        fullWidth={true}
                        label="Tipo de grupo"
                        variant="outlined"
                        value={groupElement.group.info.recognizedInfo.type}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            handleChangeRecognizedInfo("type", event.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        type="text"
                        fullWidth={true}
                        label="Facultad"
                        variant="outlined"
                        value={groupElement.group.info.recognizedInfo.faculty}
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
                        value={groupElement.group.info.recognizedInfo.department}
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
                        value={groupElement.group.info.recognizedInfo.mainProfessor}
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
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
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
                                <BsFacebook />
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
                                <BsInstagram />
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
                                <BsLinkedin />
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
                                <BsTwitter />
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
                                <BsYoutube />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={4}>
            </Grid>
        </Grid>

        <Button variant="contained" sx={{mt: 4}} color="primary" onClick={() => handleSubmit().then(() =>  setIsPosting(false)).catch(e =>  handleSubmitError(e))}>
            Crear Grupo
        </Button>

        <Snackbar open={openNotification} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {notificationMessage}
            </Alert>
        </Snackbar>
        <br/>
    </Box>)

    async function handleSubmit() {

        if (isPosting) {
            return Promise.reject("Already handling request");
        }

        setIsPosting(true);

        const response = await axios.post('http://localhost:3002/api/group', groupElement);
        console.log(response);
    }

    function handleSubmitError(e : any) {
        console.log(e?.response?.data)

        setIsPosting(false);
        setNotificationMessage(e?.response?.data?.message);
        setOpenNotification(true);
    }
}

export default GroupForm;

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    {
        title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    {
        title: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    {
        title: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
];
