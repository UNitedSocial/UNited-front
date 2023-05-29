export async function sendContactUs() {
    /*const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL || "",
        headers: {
            "Authorization": "Bearer " + token
        }
    });*/

    return await new Promise(r => setTimeout(r, 3000));
}