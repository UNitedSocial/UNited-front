import axios from "axios";
import { SectionElement } from "../../interfaces/Groups/SectionElement";

export async function postSections(groupname: string | undefined, sections: SectionElement[], getAccessTokenSilently: any) {
    const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: "http://localhost:3002",
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    for (var i = 0;i < sections.length;i++){
    const sectionRequestDTO = sections[i]
    await instance.post("/groups/" + groupname + "sections", sectionRequestDTO)
    }
}