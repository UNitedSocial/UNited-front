import {Grid} from "@mui/material";
import UtilityMenu from "../../components/UtilityMenu/UtilityMenu";
import AdminPage from "../../components/AdminPage/AdminPage";
import {postUserInformation} from "../../backendConnection/Users/postUserInformation";
import {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";
import LoadingScreen from "../Loading/LoadingScreen";
import ErrorMessage from "../Error/ErrorMessage";

export default function Admin(props: any) {

    const {isAuthenticated, getAccessTokenSilently, user, isLoading} = useAuth0();

    const [loading, setloading] = useState(true);
    const [hasErrorLoading, setHasErrorLoading] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            loadInformation().then();
        }
    }, [isAuthenticated]);

    const toogleLoading = (value: boolean) => {
        setloading(value);
    }

    const toogleHasErrorLoading = (value: any) => {
        setHasErrorLoading(value);
    }

    const loadInformation = async () => {
        while (isLoading) {
            await new Promise(r => setTimeout(r, 100));
        }
        await postUserInformation(getAccessTokenSilently, user).then(r => {
            if (r !== "master") {
                navigate("/");
            }
            toogleLoading(false);
        });
    };

    if (loading) {
        return (<LoadingScreen/>);
    }

    if (hasErrorLoading !== null) {
        return (<ErrorMessage/>);
    }

    return (

        <Grid container>
            <Grid item xs={3}>
                <Grid container justifyContent="center">
                    <></>
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <AdminPage toogleHasErrorLoading={toogleHasErrorLoading}/>
            </Grid>

            <Grid item xs={3}>
                <Grid container justifyContent="center">
                    <UtilityMenu/>
                </Grid>
            </Grid>
        </Grid>

    )

}