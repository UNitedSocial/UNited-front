import axios from "axios";

export async function postUserGroupRequest(groupname: string | undefined, getAccessTokenSilently: any, userState: string | undefined, user: string | undefined) {

    const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: "http://localhost:3002",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (userState === "notBelongs") {
        const groupNameDTO = {
            "groupName": groupname
        }

        await instance.post("/groups/" + groupname + "/requests", groupNameDTO)
    } else if (userState === "pending") {

    } else if (userState === "belongs") {
        const groupNameDTO = {
            "name": groupname,
            "user" : {"nickname": user}
        }

        await instance.put("/users/quitGroup", groupNameDTO)
    }
}