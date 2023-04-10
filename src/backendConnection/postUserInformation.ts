import axios from "axios";

export async function postUserInformation(getAccessTokenSilently: any) {
    const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: "http://localhost:3002",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    await instance.post("/users/createUser")
}