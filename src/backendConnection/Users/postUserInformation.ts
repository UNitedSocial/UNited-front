import axios from "axios";

export async function postUserInformation(getAccessTokenSilently: any, user: any) {
    const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: "http://localhost:3002",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    let userDTO = {
        user:{
            username: user.nickname,
            name: user.name,
            email: user.email
        }
    }

    return await instance.post("/users/", userDTO)
}