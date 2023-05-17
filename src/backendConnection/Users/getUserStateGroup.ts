import axios from "axios";

export async function getUserStateGroup(groupname: string | undefined, username: string | undefined) {

    if (groupname === undefined || username === undefined) {
        return undefined;
    }

    const response = await axios.get(`http://localhost:3002/groups/${groupname}/${username}`);


    return await response.data;
}
