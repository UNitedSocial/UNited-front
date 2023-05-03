import axios from "axios";

export async function getGroupSimilar(groupname: string | undefined) {
    if (groupname === undefined) {
        throw new Error("Groupname is undefined");
    }

    const response = await axios.get("http://localhost:3002/groups/" + groupname + "/related?n=3&a=0");

    return await response.data;
}