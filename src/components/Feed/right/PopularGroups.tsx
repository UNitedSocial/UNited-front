import {Card, CardContent, Stack, Typography} from "@mui/material";
import GroupMapping from "../../Groups/groupMapping/GroupMapping";

export default function PopularGroups(props: any) {

    const {popularGroups} = props;

    return (
        <Card sx={{maxWidth: {xs: "60%", md: "100%"}}} style={{background: "#EFECEB"}} variant="outlined">
            <CardContent>
                <Typography variant="inherit" component="div" sx={{mt: 2, mb: 2}} className="sidebarUtilityTitle">
                    <strong>
                        Grupos populares:
                    </strong>
                </Typography>

                <Stack>
                    {popularGroups?.map((g: any, idx: any) => (<GroupMapping key={idx} groupName={g?.info?.name}/>))}
                </Stack>
            </CardContent>
        </Card>
    )
}