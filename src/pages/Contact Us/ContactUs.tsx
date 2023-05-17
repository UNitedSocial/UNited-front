import {Grid} from "@mui/material";
import UtilityMenu from "../../components/UtilityMenu/UtilityMenu";
import ContactForm from "../../components/Contact Us/ContactForm";

export default function ContactUs(props: any) {

    return (

        <Grid container>
            <Grid item xs={3}>
                <Grid container justifyContent="center">
                    <></>
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <ContactForm />
            </Grid>

            <Grid item xs={3}>
                <Grid container justifyContent="center">
                    <UtilityMenu/>
                </Grid>
            </Grid>
        </Grid>

    )

}