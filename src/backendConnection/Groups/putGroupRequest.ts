import axios from "axios";

export async function putGroupRequest(user: string | undefined, response: string | undefined, username: string | undefined, groupname: string | undefined, getAccessTokenSilently: any) {

    const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: "https://united-back-7hm5l4l62a-rj.a.run.app",
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