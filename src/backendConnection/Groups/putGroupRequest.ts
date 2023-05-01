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
        "username": username, //el que envía la solicitud
        "answer": response //aceptar o rechazar
    }

    await instance.put("/groups/seeGroup/" + groupname + "/requests", groupRequestDTO)
}