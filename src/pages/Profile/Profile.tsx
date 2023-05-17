import {Grid} from "@mui/material";
import GroupForm from "../../components/GroupForm/GroupForm";
import UtilityMenu from "../../components/UtilityMenu/UtilityMenu";
import UserProfile from "../../components/Users/UserProfile";

export default function Profile(props: any) {

    return (

        <Grid container>
            <Grid item xs={3}>
                <Grid container justifyContent="center">
                    <></>
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <UserProfile/>
            </Grid>

            <Grid item xs={3}>
                <Grid container justifyContent="center">
                    <UtilityMenu/>
                </Grid>
            </Grid>
        </Grid>

    )

}