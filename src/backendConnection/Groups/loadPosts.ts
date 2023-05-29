import axios from "axios";

export async function loadPosts(page: number) {

    let urlBackend = process.env.REACT_APP_BACKEND_URL || ""

    const response = await axios.get(urlBackend + "/groups/");

    return await response.data;
}
