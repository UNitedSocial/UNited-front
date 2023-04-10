import axios from "axios";

export async function postUserGroupRequest(groupname: string | undefined, getAccessTokenSilently: any) {
    const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: "http://localhost:3002",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const groupNameDTO = {
        "groupName": groupname
    }
    await instance.post("/api/request", groupNameDTO)
}