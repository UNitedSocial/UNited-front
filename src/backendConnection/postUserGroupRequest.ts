import axios from "axios";

export async function postUserGroupRequest(groupname: string | undefined, getAccessTokenSilently: any, userState: string | undefined) {

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

        await instance.post("/groups/seeGroup/" + groupname + "/sendRequest", groupNameDTO)
    } else if (userState === "pending") {

    } else if (userState === "belongs") {
        const groupNameDTO = {
            "name": groupname
        }

        await instance.put("/users/quitGroup", groupNameDTO)
    }
}