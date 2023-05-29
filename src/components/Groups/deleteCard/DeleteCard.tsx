import Stack from "@mui/material/Stack";
import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {deleteGroup} from "../../../backendConnection/Groups/deleteGroup";
import {useAuth0} from "@auth0/auth0-react";

export default function DeleteCard(props: any) {

    const {getAccessTokenSilently} = useAuth0();

    const {userState, groupName, toogleUpdate, toogleIsLoadingScreen, toogleHome, toogleNotification} = props;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        if (userState === "editor") {
            setOpen(true);
        }
    };

    const handleClose = (response: boolean) => {

        if (userState === "editor") {
            if (response) {
                toogleIsLoadingScreen(true);
                deleteGroup(groupName, getAccessTokenSilently)
                    .then(() => {
                        toogleHome();
                    })
                    .catch(() => {
                        toogleIsLoadingScreen(false);
                        toogleNotification("Error al borrar el grupo", "error");
                    });
            }

            setOpen(false);
        } else {
            return;
        }
    };

    return (
        <Card sx={{maxWidth: {xs: "60%", md: "100%"}}} style={{background: "#EFECEB"}} variant="outlined">
            <CardContent>
                <Stack className="sidebarUtilityMenu">
                    <ul>
                        <li>
                            <button onClick={() => handleClickOpen()}>
                                Borrar grupo
                            </button>
                        </li>
                    </ul>
                </Stack>
                <Dialog
                    open={open}
                    onClose={() => handleClose(false)}
                >
                    <DialogTitle>
                        {"Editar usuario"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ¿Desea borrar el grupo?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose(false)}>No</Button>
                        <Button onClick={() => handleClose(true)} autoFocus>
                            Si
                        </Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    )

}
