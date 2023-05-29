import axios from "axios";

export async function postUserGroupRequest(groupname: string | undefined, getAccessTokenSilently: any, userState: string | undefined, user: string | undefined) {

    const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: "https://united-back-7hm5l4l62a-rj.a.run.app",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (userState === "doesn't belong") {
        const groupNameDTO = {
            "groupName": groupname
        }

        return await instance.post("/groups/" + groupname + "/requests", groupNameDTO)
    } else if (userState === "member" || userState === "editor") {
        const groupNameDTO = {
            "user": {"username": user}
        }

        return await instance.put("/groups/" + groupname + "/quitGroup", groupNameDTO)
    }
}