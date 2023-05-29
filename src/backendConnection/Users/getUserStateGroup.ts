import axios from "axios";

export async function getUserStateGroup(groupname: string | undefined, username: string | undefined) {

    if (groupname === undefined || username === undefined) {
        return undefined;
    }

    let urlBackend = "https://united-back-7hm5l4l62a-rj.a.run.app";

    const response = await axios.get(urlBackend + `/groups/${groupname}/${username}`);


    return await response.data;
}
