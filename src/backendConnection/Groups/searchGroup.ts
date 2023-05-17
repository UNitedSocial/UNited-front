import axios from "axios";

export async function searchGroup(searchText: string | undefined, filters: any, orders: any, descending: any) {
    if (searchText === undefined) {
        throw new Error("Search is undefined");
    }

    // /search/h?ord=members&des=yes&fil=date&val=2018

    const response = await axios.get(`http://localhost:3002/search/${searchText}?ord=${orders.order}&des=${descending}&fil=${filters.filter}&val=${filters.value}`);

    return await response.data;
}