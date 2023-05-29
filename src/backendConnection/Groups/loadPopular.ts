import axios from "axios";

export async function loadPopular() {

    let urlBackend = process.env.REACT_APP_BACKEND_URL || "";

    console.log(urlBackend + "/groups/0/popular")

    const response = await axios.get(urlBackend + "/groups/0/popular");

    return await response.data;
}
