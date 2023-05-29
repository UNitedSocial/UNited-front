import "./similarCard.css"
import {Card, CardContent, Stack, Typography} from "@mui/material";
import GroupMapping from "../groupMapping/GroupMapping";

export default function SimilarCard(props: any) {

    const {groupSimilars} = props;

    return (<>
        <Card sx={{maxWidth: {xs: "60%", md: "100%"}}} style={{background: "#EFECEB"}} variant="outlined">
            <CardContent>
                <Typography variant="inherit" component="div" sx={{mb: 2, mt: 2}} className="sidebarUtilityTitle">
                    <strong>
                        Grupos similares:
                    </strong>
                </Typography>
                <Stack className="sidebarUtilityMenu">
                    <ul>
                        {groupSimilars?.map((g: any, idx: any) => {
                            return (<GroupMapping key={idx} groupName={g?.group?.name}/>);
                        })}
                    </ul>
                </Stack>
            </CardContent>
        </Card>
    </>)
}