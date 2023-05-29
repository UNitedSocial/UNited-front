import axios from "axios";

export async function searchGroup(searchText: string | undefined, filters: any, orders: any, descending: any) {
    if (searchText === undefined) {
        throw new Error("Search is undefined");
    }

    let urlBackend = "https://united-back-7hm5l4l62a-rj.a.run.app"

    let url = urlBackend + `/search/${searchText}?ord=${orders.order}&des=${descending}&fil=${filters.filter}&val=${filters.value}`;


    const response = await axios.get(url);

    return await response.data;
}