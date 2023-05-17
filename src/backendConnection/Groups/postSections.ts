import axios from "axios";
import {SectionElement} from "../../interfaces/Groups/SectionElement";

export async function postSections(groupname: string | undefined, sections: SectionElement[], getAccessTokenSilently: any) {
    const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: "http://localhost:3002",
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    for (let i = 0; i < sections.length; i++) {
        const sectionRequestDTO = {
            "position": sections[i].position,
            "section": {
                "content": {
                    [sections[i].type]: sections[i].content
                }
            }
        };

        return await instance.put("/" + groupname + "/sections", sectionRequestDTO)
    }
}