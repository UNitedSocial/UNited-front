import {Divider, Grid, Typography} from "@mui/material";
import {RxCrossCircled} from "react-icons/rx";
import React from "react";
import dayjs from "dayjs";
import {deleteReport} from "../../backendConnection/Reports/deleteReport";
import {useAuth0} from "@auth0/auth0-react";

function ReportElement(props: any) {

    const {report, toogleNotification, toogleUpdate, toogleLoading} = props;

    const {getAccessTokenSilently, isLoading} = useAuth0();

    return (
        <>
            <Grid container spacing={2} sx={{mt: 2}}>
                <Grid item xs={10.5}>
                    <Typography sx={{mb: 2, color: "red"}}>
                        {
                            report?.reportType === "reportError" ? "Error " :
                                report?.reportType === "reportGroup" ? "Grupo " :
                                    report?.reportType === "reportUser" ? "Usuario " :
                                        report?.reportType === "feedback" ? "Feedback " : "Otro "
                        }
                    </Typography>
                    <span
                        className="sidearFriendName"><strong>{
                            dayjs(report?.date).format("YYYY-MM-DD / HH:MM")
                    }</strong></span>
                    {
                        report?.reportingUser?.name === undefined ? "" :
                            <span className="sidearFriendName">{
                                " - " + report?.reportingUser?.name + " (" + report?.reportingUser?.email + ") "
                            }</span>
                    }
                    <br/>
                    <Typography sx={{mt: 1}}>
                        {report?.reportInfo?.description}
                    </Typography>
                </Grid>
                <Grid item xs={1.5}>
                    <button
                        onClick={async () => {
                            toogleLoading(true);
                            while (isLoading) {
                                await new Promise(resolve => setTimeout(resolve, 100));
                            }
                            deleteReport(getAccessTokenSilently, report?._id).then(() => {
                                toogleNotification("Reporte eliminado", "success");
                                toogleUpdate();
                            }).catch(e => {
                                toogleNotification("Error al eliminar el reporte", "error");
                            });
                        }}
                        style={{
                            border: "none",
                            background: "none",
                            padding: "0",
                            font: "inherit",
                            cursor: "pointer"
                        }}>
                        <RxCrossCircled color={"red"} size={20}/>
                    </button>
                </Grid>
            </Grid>
            <Divider sx={{mt: 2}}/>
        </>
    )
}

export default ReportElement;