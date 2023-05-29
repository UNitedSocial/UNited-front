import axios from "axios";

export async function loadPopular() {

    let urlBackend = "https://united-back-7hm5l4l62a-rj.a.run.app";

    console.log(urlBackend + "/groups/0/popular");

    const response = await axios.get(urlBackend + "/groups/0/popular");

    return await response.data;
}
