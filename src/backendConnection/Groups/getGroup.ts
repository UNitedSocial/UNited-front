import axios from "axios";

export async function getGroup(groupname: string | undefined) {
    if (groupname === undefined) {
        throw new Error("Groupname is undefined");
    }

    let urlBackend = process.env.REACT_APP_BACKEND_URL || "";

    const response = await axios.get(urlBackend + "/groups/" + groupname);

    return await response.data;
}
