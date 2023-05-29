import axios from "axios";

export async function deleteReport(getAccessTokenSilently: any, reportId: string) {

    const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: "https://united-back-7hm5l4l62a-rj.a.run.app",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    console.log("/reports?report=" + reportId)

    return await instance.delete("/reports?report=" + reportId);
}