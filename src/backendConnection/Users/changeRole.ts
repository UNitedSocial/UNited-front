import axios from "axios";

export async function changeRole(groupname: string | undefined, username: string | undefined, role: string | undefined, getAccessTokenSilently: any) {

    if (groupname === undefined || username === undefined || role === undefined || getAccessTokenSilently === undefined) {
        return undefined;
    }

    const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: "http://localhost:3002",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const changeRoleDTO = {
        username: username,
        role: role
    };

    return await instance.put(`/groups/${groupname}/changeRole`, changeRoleDTO);
}
