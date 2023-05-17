import {Box, Button, CircularProgress, Grid, Stack, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import Notification from "../Notification/Notification";


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
    const [notificationDTO, setNotificationDTO] = useState<any>({open: false, message: "", severity: "info"})

    function handleChangeForm(page: string, value: string | null) {
        setFormElement({
            ...formElement, contactForm: {
                ...formElement.contactForm, [page]: value
            }
        })
    }

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

    return (
        <>
            <Box maxWidth="xl" style={{position: "relative"}}>

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
                                Estaremos encantados de responder cualquier pregunta que puedas tener. Tan pronto como
                                recibamos tu mensaje, te responderemos lo antes posible.
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
                        <Stack spacing={2} sx={{mt: 4}}>
                            <TextField
                                type="text"
                                fullWidth={true}
                                label="Nombre"
                                variant="outlined"
                                error={formElement.contactForm.name === ""}
                                helperText={formElement.contactForm.name === "" ? "El nombre es requerido" : ""}
                                value={formElement.contactForm.name}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeForm("name", event.target.value);
                                }}
                            />
                            <TextField
                                type="text"
                                fullWidth={true}
                                label="Correo electrónico"
                                variant="outlined"
                                error={formElement.contactForm.email === ""}
                                helperText={formElement.contactForm.email === "" ? "El correo es requerido" : ""}
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
                                error={formElement.contactForm.message === ""}
                                helperText={formElement.contactForm.message === "" ? "El mensaje es obligatorio" : ""}
                                value={formElement.contactForm.message}
                                onChange={(newValue) => handleChangeForm("message", newValue.target.value)}
                            />
                            <Button variant="contained" sx={{mt: 4}} color="primary"
                                    onClick={() => handleSubmit().then(() => {
                                        setNotificationDTO({
                                            open: true,
                                            message: "Mensaje enviado con éxito",
                                            severity: "success"
                                        });
                                        setFormElement({
                                            contactForm: {
                                                name: "",
                                                email: "",
                                                message: ""
                                            }
                                        });
                                        setIsPosting(false);
                                    }).catch(e => handleSubmitError(e))}>
                                Enviar mensaje
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>

                <Notification notificationDTO={notificationDTO} setNotificationDTO={setNotificationDTO}/>

                <br/>
            </Box>
        </>
    );

    async function handleSubmit() {
        if (isPosting) {
            return Promise.reject("Already handling request");
        }

        setIsPosting(true);

        const response = await axios.post("http://localhost:3002/api/group", formElement);
    }

    function handleSubmitError(e: any) {
        setIsPosting(false);
        setNotificationDTO({open: true, message: "Error al enviar mensaje", severity: "error"});
    }
}

export default ContactForm;