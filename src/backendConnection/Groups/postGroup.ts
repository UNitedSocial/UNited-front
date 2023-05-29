import axios from "axios";

export async function postGroup(group: any, getAccessTokenSilently: any, edit : any) {
    const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL || "",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if(edit){
        return await instance.put("/groups/" + group.group?.info?.name, group);
    } else {
        return await instance.post("/groups/", group);
    }
}