import {Box, Button, CircularProgress, Grid, Stack, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import Notification from "../Notification/Notification";
import Popup from "./Modal/Popup"
import {sendContactUs} from "../../backendConnection/Users/sendContactUs";
import {reportError} from "../../backendConnection/Users/reportError";
import {useAuth0} from "@auth0/auth0-react";


function ContactForm() {

    const {getAccessTokenSilently, isAuthenticated} = useAuth0();
    const [isPosting, setIsPosting] = useState(false)
    const [formElement, setFormElement] = useState({
        contactForm: {
            name: "",
            email: "",
            message: ""
        }
    });
    const [notificationDTO, setNotificationDTO] = useState<any>({open: false, message: "", severity: "info"});
    const [focused, setFocused] = useState<any>([]);


    const toogleNotification = (message: string, severity: "success" | "info" | "warning" | "error") => {
        setNotificationDTO({open: true, message: message, severity: severity});
    }

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
                            <a href="https://wa.me/+573004567869" target="_blank" rel="noreferrer" style={{
                                textDecoration: "none",
                                color: "#010103",
                                fontSize: "1.4rem",
                                fontWeight: "500",
                                transition: "all 0.2s"
                            }}>
                                Whatsapp: +57 300 456 7869
                            </a>
                            <a href="mailto:united@mail.com" target="_blank" rel="noreferrer" style={{
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
                                error={formElement.contactForm.name === "" && focused.includes("name")}
                                helperText={formElement.contactForm.name === "" ? "El nombre es requerido" : ""}
                                value={formElement.contactForm.name}
                                onFocus={() => setFocused([...focused, "name"])}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeForm("name", event.target.value);
                                }}
                            />
                            <TextField
                                type="text"
                                fullWidth={true}
                                label="Correo electrónico"
                                variant="outlined"
                                error={formElement.contactForm.email === "" && focused.includes("email")}
                                helperText={formElement.contactForm.email === "" ? "El correo es requerido" : ""}
                                value={formElement.contactForm.email}
                                onFocus={() => setFocused([...focused, "email"])}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeForm("email", event.target.value);
                                }}
                            />
                            <TextField
                                label="Descripción"
                                multiline
                                fullWidth={true}
                                rows={4}
                                error={formElement.contactForm.message === "" && focused.includes("message")}
                                helperText={formElement.contactForm.message === "" ? "El mensaje es obligatorio" : ""}
                                value={formElement.contactForm.message}
                                onFocus={() => setFocused([...focused, "message"])}
                                onChange={(newValue) => handleChangeForm("message", newValue.target.value)}
                            />
                            <Button variant="contained" sx={{mt: 4}} color="primary"
                                    onClick={() => handleSubmit()
                                        .then(() => {
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
                                        }).catch(() => handleSubmitError())}>
                                Enviar mensaje
                            </Button>
                            <Popup toogleNotification={toogleNotification}/>
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

        let contactUS_string = `Name: ${formElement.contactForm.name}, Email: ${formElement.contactForm.email}, Message: ${formElement.contactForm.message}`;

        await reportError(contactUS_string, "Contact Us", getAccessTokenSilently, isAuthenticated);
    }

    function handleSubmitError() {
        setIsPosting(false);
        setNotificationDTO({open: true, message: "Error al enviar mensaje", severity: "error"});
    }
}

export default ContactForm;
