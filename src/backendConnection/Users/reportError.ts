import axios from "axios";

export async function reportError(report: any, checked: any, getAccessTokenSilently: any, isAuthenticated: any) {

    let instance;

    if(isAuthenticated){
        const token = await getAccessTokenSilently();
        instance = axios.create({
            baseURL: process.env.REACT_APP_BACKEND_URL || "",
            headers: {
                "Authorization": "Bearer " + token
            }
        });
    } else {
        instance = axios.create({
            baseURL: process.env.REACT_APP_BACKEND_URL || ""
        });
    }

    let errorDTO;


    if (checked === "error") {
        errorDTO = {
            report: {
                reportType: "reportError",
                reportInfo: {
                    page: "",
                    description: report
                }
            }
        }
    } else if (checked === "grupo") {
        errorDTO = {
            report: {
                reportType: "reportGroup",
                reportInfo: {
                    group: {
                        groupName: "KartsUN"
                    },
                    reason: "reason",
                    description: report
                }
            }
        }
    } else if (checked === "usuario") {
        errorDTO = {
            report: {
                reportType: "reportUser",
                reportInfo: {
                    user: {
                        username: "Santigod"
                    },
                    reason: "reason",
                    description: report
                }
            }
        }
    } else {
        errorDTO = {
            report: {
                reportType: "feedback",
                reportInfo: {
                    description: report
                }
            }
        }
    }

    if(isAuthenticated){
        return await instance.post("/reports", errorDTO);
    } else {
        errorDTO = {
            "report":{
                reportType: "feedback",
                reportInfo: {
                    description: report
                }
            }
        }
        return await instance.post("/reports/anonymous", errorDTO);
    }
}