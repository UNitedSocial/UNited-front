import axios from "axios";

export async function deleteGroup(groupname: string | undefined, getAccessTokenSilently: any ) {
    if (groupname === undefined) {
        throw new Error("Groupname is undefined");
    }

    const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL || "",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    return await instance.delete("/groups/" + groupname);
}
