import {Card, CardContent, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {loadReports} from "../../backendConnection/Reports/loadReports";
import Notification from "../Notification/Notification";
import ReportElement from "./ReportElement";
import {useAuth0} from "@auth0/auth0-react";
import ErrorMessage from "../../pages/Error/ErrorMessage";
import LoadingScreen from "../../pages/Loading/LoadingScreen";

function AdminPage(props: any) {

    const {getAccessTokenSilently, isLoading} = useAuth0();

    const {toogleHasErrorLoading} = props;

    const [reports, setReports] = useState<any[]>([]);
    const [loading, setloading] = useState(true);
    const [update, setUpdate] = useState(false);
    const [hasErrorLoading, sethasErrorLoading] = useState(null);
    const [notificationDTO, setNotificationDTO] = useState({open: false, message: "", severity: "info"});

    useEffect(() => {
        loadInformation().then();
    }, []);

    useEffect(() => {
        loadInformation().then();
    }, [update]);

    const loadInformation = async () => {
        if(!loading){
            toogleLoading(true);
        }
        while (isLoading) {
            await new Promise(r => setTimeout(r, 100));
        }
        loadReports(getAccessTokenSilently).then(r => {
            setReports(r);
        }).catch(e => {
            toogleHasErrorLoading(e);
        }).finally(() => {
            toogleLoading(false);
        });
    }

    const toogleLoading = (value: boolean) => {
        setloading(value);
    }

    const toogleUpdate = () => {
        setUpdate(!update);
    }

    const toogleNotification = (message: string, severity: "success" | "info" | "warning" | "error") => {
        setNotificationDTO({open: true, message: message, severity: severity});
    }

    if (loading) {
        return (<LoadingScreen/>);
    }

    if (hasErrorLoading !== null) {
        return (<ErrorMessage/>);
    }

    return (
        <Card sx={{maxWidth: {xs: "60%", md: "50vw"}}} style={{background: "#EFECEB"}} variant="outlined">
            <CardContent>
                <Typography variant="h5">
                    Reportes
                </Typography>
                {reports.map((report) => (
                    <ReportElement key={report.id} report={report} toogleNotification={toogleNotification} toogleUpdate={toogleUpdate} toogleLoading={toogleLoading}/>
                ))}
            </CardContent>
            <Notification notificationDTO={notificationDTO} setNotificationDTO={setNotificationDTO}/>
        </Card>
    )
}

export default AdminPage;