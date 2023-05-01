import {Box, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import GroupCardSmall from "../../../components/Groups/groupCardSmall/GroupCardSmall";

export default function MainFeed(props: any) {

    const [posts, setPosts] = useState<any[]>([]);

    // TODO: call all posts from backend

    useEffect(() => {
        setPosts(props.posts)
    }, [props.posts]);

    return (
        <Box maxWidth="xl" style={{position: 'relative'}}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={5}>
                {posts.map((postElement, idx) => {
                    return <GroupCardSmall key={idx} info={postElement.info}/>
                })}
            </Stack>
        </Box>
    )

}