import axios from "axios";

export async function searchGroup(searchText: string | undefined) {
    if (searchText === undefined) {
        throw new Error("Search is undefined");
    }

    const response = await axios.get('http://localhost:3002/search/' + searchText);

    console.log("response.data");
    console.log(response.data);

    return await response.data;
}