import axios from "axios";

export async function getUserStateGroup(groupname: string | undefined, username: string | undefined) {

    if (groupname === undefined || username === undefined) {
        throw new Error("Groupname or username is undefined");
    }

    const response = await axios.get(`http://localhost:3002/groups/${groupname}/${username}`);


    return await response.data;
}
