import axios from "axios";

export async function loadPosts() {
    const response = await axios.get('http://localhost:3002/groups/');
    return await response.data;
}