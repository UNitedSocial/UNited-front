import axios from "axios";

export async function getGroupRequests(groupname: string | undefined) {
    if(groupname === undefined){
        throw new Error("Groupname is undefined");
    }

    const response = await axios.get("http://localhost:3002/groups/seeGroup/" + groupname + "/requests");


    return response.data[0].requests;
}