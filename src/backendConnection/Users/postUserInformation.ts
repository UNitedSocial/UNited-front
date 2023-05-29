import axios from "axios";

export async function postUserInformation(getAccessTokenSilently: any, user: any) {
    const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL || "",
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

    let requestResponse;

    try {
        requestResponse = await instance.post("/users/", userDTO);
        if(requestResponse?.data?.isMaster) {
            return "master";
        } else {
            return "notMaster";
        }
    } catch (e : any) {
        if(e?.response?.data.isMaster === undefined) {
            return undefined;
        } else {
            if(e?.response?.data?.isMaster) {
                return "master";
            } else {
                return "notMaster";
            }
        }
    }

    return
}