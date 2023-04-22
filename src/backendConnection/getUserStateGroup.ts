import axios from "axios";

export async function getUserStateGroup(groupname: string | undefined, username: string | undefined) {

    if(groupname === undefined || username === undefined){
        throw new Error("Groupname or username is undefined");
    }

    const response = await axios.get(`http://localhost:3002/users/userStateGroup?username=${username}&groupname=${groupname}`);


    console.log(response.data);

    return await response.data;
}