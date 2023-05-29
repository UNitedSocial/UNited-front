import axios from "axios";

export async function getGroupSimilar(groupname: string | undefined) {
    if (groupname === undefined) {
        throw new Error("Groupname is undefined");
    }

    let urlBackend = "https://united-back-7hm5l4l62a-rj.a.run.app"

    const response = await axios.get(urlBackend + "/groups/" + groupname + "/related?n=3&a=0");

    return await response.data;
}