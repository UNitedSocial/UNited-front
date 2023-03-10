import "../App.css"
import {
    Alert,
    AppBar, Autocomplete,
    Avatar,
    Box,
    Button,
    Container, Grid,
    IconButton,
    Menu,
    MenuItem, Paper, Snackbar, TextField,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import UNited_logo from '../assets/united_logo_no_bg_white.png';
import {BiFilterAlt, BiSearch, BiSortAlt2} from "react-icons/bi";
import {text} from "stream/consumers";

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function TopNavBar(){

    const [openToast, setOpenToast] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');

    const {loginWithRedirect} = useAuth0();
    const { logout } = useAuth0();
    const { user, isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        if(selectedOption !== ""){
            if(selectedOption === "Logout"){
                logout();
            }
        }
        setSelectedOption("")
    }, [selectedOption]);

    /*useEffect(() => {
        console.log(user)
    }, [user]);*/


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        if(isAuthenticated){
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

        if(textContentHandle !== null){
            setSelectedOption(textContentHandle);
        } else {
            setSelectedOption("");
        }
        setAnchorElUser(null);
    };

    const handleEnter = (event : React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            let search;
            if(value !== ""){
                search = value;
            } else {
                search = inputValue;
            }
            handleSearch(search)
        }
    };

    const handleSearch = (search : String) => {
        console.log("Searched: " + search);
    }

    return(
        <AppBar position="static" sx={{ backgroundColor: "#0c4c8a" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        component="img"
                        sx={{
                            height: "auto",
                            width: "9%",
                            maxWidth: { xs: "100%", md: "80vw" },
                            maxHeight: { xs: "50vh", md: "60vh" },
                            margin: "auto"
                        }}
                        alt="Logo"
                        src={UNited_logo}
                    />

                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ flexGrow: 2, display: 'contents'}}>
                            <Paper sx={{
                                height: "auto",
                                width: "35%",
                                maxWidth: { xs: "100%", md: "80vw" },
                                maxHeight: { xs: "50vh", md: "60vh" },
                                margin: "auto",
                                marginLeft: "1%",
                                marginRight: "1%",
                                backgroundColor: "white",
                                padding: "0.5em"
                            }}>
                                <Grid container>
                                    <Grid item xs={10.8}>
                                        <Autocomplete
                                            freeSolo
                                            disableClearable
                                            fullWidth={true}
                                            options={top100Films.map((option) => option.title)}
                                            value={value}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }}
                                            inputValue={inputValue}
                                            onInputChange={(event, newInputValue) => {
                                                setInputValue(newInputValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    hiddenLabel
                                                    variant="outlined"
                                                    size="small"
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        type: 'search',
                                                    }}
                                                    onKeyDown={handleEnter}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={1.2}>
                                        <IconButton type="button" aria-label="search">
                                            <BiSearch />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <IconButton type="button" aria-label="search">
                                <BiFilterAlt color="#fefefe"/>
                            </IconButton>
                            <IconButton type="button" aria-label="search">
                                <BiSortAlt2 color="#fefefe"/>
                            </IconButton>
                        </Box>

                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={isAuthenticated ? "Open settings" : "Login"}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar src={user?.picture} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={isAuthenticated ? Boolean(anchorElUser) : false}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            <Snackbar open={openToast} autoHideDuration={6000} onClose={() => setOpenToast(false)}>
                <Alert onClose={() => setOpenToast(false)} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
        </AppBar>

    )
}

export default TopNavBar

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
