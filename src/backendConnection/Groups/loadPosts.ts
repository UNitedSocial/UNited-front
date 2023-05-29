import axios from "axios";

export async function loadPosts(page: number) {

    let urlBackend = "https://united-back-7hm5l4l62a-rj.a.run.app"

    const response = await axios.get(urlBackend + "/groups/?n=5&o=" + page);

    return await response.data;
}
