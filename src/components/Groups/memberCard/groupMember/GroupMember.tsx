import "./groupMember.css"
import * as React from "react";
import {useState} from "react";
import {BiPencil, BiUser} from "react-icons/bi";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";
import {changeRole} from "../../../../backendConnection/Users/changeRole";


export default function GroupMember(props: any) {

    let {getAccessTokenSilently, user} = useAuth0();
    const {member, userState, groupName, toogleUpdate, toogleIsLoadingScreen} = props;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        if (userState === "editor" && user?.nickname !== member.username) {
            setOpen(true);
        }
    };

    const handleClose = (response: boolean) => {

        let role = member.role;

        if (role === "editor") {
            role = "member";
        } else if (role === "member") {
            role = "editor";
        }

        if (response) {
            toogleIsLoadingScreen(true);
            changeRole(groupName, member.username, role, getAccessTokenSilently).then(() => toogleUpdate());
        }

        setOpen(false);
    };

    return (
        <li className="sidebarFriend">
                <span className="sidearFriendName">
                    <button onClick={() => handleClickOpen()}
                            style={{
                                border: "none",
                                background: "none",
                                padding: "0",
                                font: "inherit",
                                cursor: "pointer"
                            }}>
                        {member.role === "editor" ? <BiPencil/> : <BiUser/>}
                        {"   "}
                        {member.username}
                    </button>
                    <Dialog
                        open={open}
                        onClose={() => handleClose(false)}
                    >
                        <DialogTitle>
                            {"Editar usuario"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {member.role === "editor" ? "Desea eliminar los permisos de edición de este usuario?" : "Desea otorgar permisos de edición a este usuario?"}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleClose(false)}>No</Button>
                            <Button onClick={() => handleClose(true)} autoFocus>
                                Si
                            </Button>
                        </DialogActions>
                    </Dialog>
                </span>
        </li>
    )
}
