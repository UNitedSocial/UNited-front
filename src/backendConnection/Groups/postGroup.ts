import axios from "axios";

export async function postGroup(group: any, getAccessTokenSilently: any, edit : any) {
    const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: "http://localhost:3002",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    console.log(group)

    if(edit){
        return await instance.put("/groups/" + group.group?.info?.name, group);
    } else {
        return await instance.post("/groups/", group);
    }
}