import axios from "axios";

export async function loadNew() {

    let urlBackend = process.env.REACT_APP_BACKEND_URL || ""

    const response = await axios.get(urlBackend + "/groups/0/new");

    return await response.data;
}
