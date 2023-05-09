import {Grid} from "@mui/material";
import {GroupElement} from "../../interfaces/Groups/GroupElement";
import UtilityMenu from "../../components/UtilityMenu/UtilityMenu";
import GroupForm from "../../components/Groups/groupForm/GroupForm";

export default function NewGroup(props: any) {

    const newGroupElement: GroupElement = {
        username: "i1",
        group: {
            info: {
                name: "",
                description: "",
                contact: {
                    mail: "",
                    page: "",
                    cellphone: "",
                    socialNetworks: {
                        facebook: "",
                        instagram: "",
                        linkedin: "",
                        twitter: "",
                        youtube: ""
                    }
                },
                topics: [],
                classification: "",
                isRecognized: false,
                recognizedInfo: {
                    type: "",
                    faculty: "",
                    department: "",
                    mainProfessor: ""
                },
                fundationDate: null,
                referenceImg: "https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg"
            }
        }
    }

    return (

        <Grid container>
            <Grid item xs={3}>
                <Grid container justifyContent="center">
                    <></>
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <GroupForm group={newGroupElement} edit={false}/>
            </Grid>

            <Grid item xs={3}>
                <Grid container justifyContent="center">
                    <UtilityMenu/>
                </Grid>
            </Grid>
        </Grid>

    )

}
