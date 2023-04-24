import axios from "axios";

export async function getGroupMembers(groupname: string | undefined) {
    if (groupname === undefined) {
        throw new Error("Groupname is undefined");
    }

    const response = await axios.get("http://localhost:3002/groups/seeGroup/" + groupname + "/members");

    console.log(response.data[0].members)

    return await response.data[0].members;
}