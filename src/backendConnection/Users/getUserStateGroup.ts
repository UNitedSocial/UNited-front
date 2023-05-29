import axios from "axios";

export async function getUserStateGroup(groupname: string | undefined, username: string | undefined) {

    if (groupname === undefined || username === undefined) {
        return undefined;
    }

    let urlBackend = process.env.REACT_APP_BACKEND_URL || "";

    const response = await axios.get(urlBackend + `/groups/${groupname}/${username}`);


    return await response.data;
}
