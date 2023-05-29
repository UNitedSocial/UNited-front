import axios from "axios";

export async function loadNew() {

    let urlBackend = "https://united-back-7hm5l4l62a-rj.a.run.app"

    const response = await axios.get(urlBackend + "/groups/0/new");

    return await response.data;
}
