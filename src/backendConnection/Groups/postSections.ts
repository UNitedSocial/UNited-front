import axios from "axios";
import {SectionElement} from "../../interfaces/Groups/SectionElement";

export async function postSections(groupname: string | undefined, sections: SectionElement[], getAccessTokenSilently: any) {
    const token = await getAccessTokenSilently();
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL || "",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    for (let i = 0; i < sections.length; i++) {
        try {

            if (sections[i]._id !== undefined) {

                const sectionRequestDTO = {
                    position: sections[i].position,
                    section: {
                        type: sections[i].type,
                        content: {
                            [sections[i].type]: sections[i].content
                        }
                    }
                }

                await instance.put("/groups/" + groupname + "/sections", sectionRequestDTO);
            } else {

                const sectionRequestDTO = {
                    section: {
                        type: sections[i].type,
                        content: {
                            [sections[i].type]: sections[i].content
                        }
                    }
                }

                await instance.post("/groups/" + groupname + "/sections", sectionRequestDTO);
            }
        } catch (e) {
            throw new Error();
        }
    }
}