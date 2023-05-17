import axios from "axios";

export async function putGroupRequest(user: string | undefined, response: string | undefined, username: string | undefined, groupname: string | undefined, getAccessTokenSilently: any) {

    const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: "http://localhost:3002",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const groupRequestDTO = {
        user: {
            username: user
        },
        username: username,
        answer: response
    }

    return await instance.put("/groups/" + groupname + "/requests", groupRequestDTO)
}