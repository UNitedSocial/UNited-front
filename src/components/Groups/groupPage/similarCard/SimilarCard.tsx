import "./similarCard.css"
import {Card, CardContent, Stack, Typography} from "@mui/material";
import GroupSimilar from "../groupSimilar/GroupSimilar";

export default function SimilarCard(props: any) {

    const {groupSimilars} = props;

    return (<>
        <Card sx={{maxWidth: {xs: "60%", md: "100%"}}} style={{background: "#EFECEB"}} variant="outlined">
            <CardContent>
                <Typography variant="inherit" component="div" sx={{mb: 2}} className="sidebarUtilityTitle">
                    <strong>
                        Grupos similares:
                    </strong>
                </Typography>
                <Stack className="sidebarUtilityMenu">
                    <ul>
                        {groupSimilars?.map((g: any, idx: any) => {
                            return (<GroupSimilar key={idx} group={g}/>);
                        })}
                    </ul>
                </Stack>
            </CardContent>
        </Card>
    </>)
}