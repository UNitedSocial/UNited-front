import axios from "axios";

export async function postGroup(group: any, getAccessTokenSilently: any, edit : any) {
    const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: "https://united-back-7hm5l4l62a-rj.a.run.app",
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