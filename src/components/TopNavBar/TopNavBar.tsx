import "../../App.css"
import {
    Alert,
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    Snackbar,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import UNited_logo from "../../assets/united_logo_no_bg_white.png";
import {BiFilterAlt, BiSearch, BiSortAlt2} from "react-icons/bi";
import {useLocation, useNavigate} from "react-router-dom"
import {postUserInformation} from "../../backendConnection/Users/postUserInformation";

const settings = ["Perfil", "Cuenta", "Panel de estadísticas", "Cerrar sesión"];
const pages = ["Contáctanos"];

function TopNavBar() {


    const [nav, setNav] = useState(false);


    const openNav = () => {
        setNav(!nav);
    };

    const [openToast, setOpenToast] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [value, setValue] = useState("");

    const {loginWithRedirect} = useAuth0();
    const {logout} = useAuth0();
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();

    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        if (selectedOption !== "") {
            if (selectedOption === "Perfil") {
                navigate("/profile");
            }
            if (selectedOption === "Cerrar sesión") {
                logout();
            }
        }
        setSelectedOption("")
    }, [selectedOption]);

    useEffect(() => {
        if (isAuthenticated) {
            postUserInformation(getAccessTokenSilently, user).then();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        setValue("");
    }, [location]);


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        if (isAuthenticated) {
            setAnchorElUser(event.currentTarget);
        } else {
            loginWithRedirect().then(() => setOpenToast(true));
            setSelectedOption("")
            setAnchorElUser(event.currentTarget);
        }
    };

    const handleCloseUserMenu = (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        const textContentHandle = target.textContent;

        if (textContentHandle !== null) {
            setSelectedOption(textContentHandle);
        } else {
            setSelectedOption("");
        }
        setAnchorElUser(null);
    };

    const handleSearchClick = (e: any) => {
        e.preventDefault();
        handleSearch(value);
    }

    function handleSearch(search: string) {
        navigate("/search/" + search)
    }

    return (
        <AppBar position="fixed" sx={{backgroundColor: "#0c4c8a"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <IconButton onClick={() => navigate("/")}
                                sx={{
                                    width: "9%",
                                    maxWidth: {xs: "100%", md: "80vw"},
                                    maxHeight: {xs: "45vh", md: "55vh"}
                                }}>
                        <Box
                            component="img"
                            sx={{
                                height: "auto",
                                width: "100%"
                            }}
                            alt="Logo"
                            src={UNited_logo}
                        />
                    </IconButton>

                    <Box sx={{flexGrow: 1, display: "flex", justifyContent: "center"}}>
                        <Box component="form" onSubmit={handleSearchClick} noValidate
                             sx={{flexGrow: 2, display: "contents"}}>
                            <Paper sx={{
                                height: "auto",
                                width: "35%",
                                maxWidth: {xs: "100%", md: "80vw"},
                                maxHeight: {xs: "50vh", md: "60vh"},
                                margin: "auto",
                                marginLeft: "1%",
                                marginRight: "1%",
                                backgroundColor: "white",
                                padding: "0.5em"
                            }}>
                                <Grid container>
                                    <Grid item xs={10.8}>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            InputProps={{
                                                type: "search"
                                            }}
                                            fullWidth={true}
                                            value={value}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setValue(event.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={1.2}>
                                        <IconButton type="submit" aria-label="search" onClick={handleSearchClick}>
                                            <BiSearch/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>

                    </Box>

                    <Box sx={{flexGrow: 0.03, display: {xs: "none", md: "flex"}}}>
                        <Button
                            key={pages[0]}
                            onClick={() => navigate("/contact-us")}
                            sx={{my: 2, color: "white", display: "block"}}
                        >
                            {pages[0]}
                        </Button>


                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title={isAuthenticated ? "Opciones" : "Iniciar sesión"}>
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar src={user?.picture}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: "2.813em"}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={isAuthenticated ? Boolean(anchorElUser) : false}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting, idx) => (
                                <MenuItem key={idx} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            <Snackbar open={openToast} autoHideDuration={6000} onClose={() => setOpenToast(false)}>
                <Alert onClose={() => setOpenToast(false)} severity="success" sx={{width: "100%"}}>
                    This is a success message!
                </Alert>
            </Snackbar>
        </AppBar>

    )
}

export default TopNavBar
