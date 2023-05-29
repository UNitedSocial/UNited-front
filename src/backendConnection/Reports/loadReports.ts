import axios from "axios";

export async function loadReports(getAccessTokenSilently: any) {

    const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL || "",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    let response = await instance.get("/reports");

    return response.data;

}