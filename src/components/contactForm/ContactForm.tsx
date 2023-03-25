import {Alert, Box, Button, CircularProgress, Grid, Link, Snackbar, Stack, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";


function ContactForm() {

    const {user, isAuthenticated, getAccessTokenSilently, isLoading} = useAuth0();
    const [isPosting, setIsPosting] = useState(false)
    const [formElement, setFormElement] = useState({
        contactForm: {
            name: "",
            email: "",
            message: ""
        }
    });
    const [openNotification, setOpenNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    function handleChangeForm(page: string, value: string | null) {
        setFormElement({
            ...formElement, contactForm: {
                ...formElement.contactForm, [page]: value
            }
        })
        console.log(formElement)
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenNotification(false);
    };

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

    return (
        <>
            <Box maxWidth="xl" style={{position: 'relative'}}>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Stack spacing={3}>
                            <h2 style={{
                                fontSize: "3.2rem",
                                lineHeight: "1.3"
                            }}>Envíanos un mensaje</h2>
                            <p style={{
                                fontSize: "1.5rem",
                                fontFamily: "sans-serif",
                                color: "#706f7b",
                                lineHeight: "1.6",
                            }}>
                                Estamos complacidos en responder cualquier pregunta que puedas tener. Envíanos un
                                mensaje y tan pronto lo
                                recibamos, te estaremos respondiendo.
                            </p>
                            <a href="https://wa.me/+573004567869" target="_blank" style={{
                                textDecoration: "none",
                                color: "#010103",
                                fontSize: "1.4rem",
                                fontWeight: "500",
                                transition: "all 0.2s"
                            }}>
                                Whatsapp: +57 300 456 7869
                            </a>
                            <a href="mailto:united@mail.com" target="_blank" style={{
                                textDecoration: "none",
                                color: "#010103",
                                fontSize: "1.4rem",
                                fontWeight: "500",
                                transition: "all 0.2s"
                            }}>
                                Email: united@mail.com
                            </a>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={2}  sx={{mt: 4}}>
                            <TextField
                                type="text"
                                fullWidth={true}
                                label="Nombre del grupo"
                                variant="outlined"
                                value={formElement.contactForm.name}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeForm("name", event.target.value);
                                }}
                            />
                            <TextField
                                type="text"
                                fullWidth={true}
                                label="Nombre del grupo"
                                variant="outlined"
                                value={formElement.contactForm.email}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeForm("email", event.target.value);
                                }}
                            />
                            <TextField
                                label="Descripción"
                                multiline
                                fullWidth={true}
                                rows={4}
                                value={formElement.contactForm.message}
                                onChange={(newValue) => handleChangeForm("message", newValue.target.value)}
                            />
                            <Button variant="contained" sx={{mt: 4}} color="primary"
                                    onClick={() => handleSubmit().then(() => setIsPosting(false)).catch(e => handleSubmitError(e))}>
                                Enviar mensaje
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>

                <Snackbar open={openNotification} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                        {notificationMessage}
                    </Alert>
                </Snackbar>
                <br/>
            </Box>
        </>
    );

    async function handleSubmit() {
        if (isPosting) {
            return Promise.reject("Already handling request");
        }

        setIsPosting(true);

        const response = await axios.post('http://localhost:3002/api/group', formElement);
    }

    function handleSubmitError(e: any) {

        setIsPosting(false);
        setNotificationMessage(e?.response?.data?.message);
        setOpenNotification(true);
    }
}

export default ContactForm;