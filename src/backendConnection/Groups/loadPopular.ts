import axios from "axios";

export async function loadPopular() {
    const response = await axios.get("http://localhost:3002/0/popular");
    /*console.log("loadPopular");
    console.log(response.data);*/

    return await response.data;
}
