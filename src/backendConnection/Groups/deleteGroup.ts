import axios from "axios";

export async function deleteGroup(groupname: string | undefined, getAccessTokenSilently: any ) {
    if (groupname === undefined) {
        throw new Error("Groupname is undefined");
    }

    const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: "https://united-back-7hm5l4l62a-rj.a.run.app",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    return await instance.delete("/groups/" + groupname);
}
