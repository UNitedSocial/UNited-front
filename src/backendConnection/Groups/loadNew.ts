import axios from "axios";

export async function loadNew() {
    const response = await axios.get("http://localhost:3002/0/new");
    /*console.log("loadNew");
    console.log(response.data);*/

    return await response.data;
}
