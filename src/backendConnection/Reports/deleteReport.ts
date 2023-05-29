import axios from "axios";

export async function deleteReport(getAccessTokenSilently: any, reportId: string) {

    const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL || "",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    console.log("/reports?report=" + reportId)

    return await instance.delete("/reports?report=" + reportId);
}