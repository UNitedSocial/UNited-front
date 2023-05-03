import {Box, Stack} from "@mui/material";
import GroupCardSmall from "../../../components/Groups/groupCardSmall/GroupCardSmall";
import InfiniteScroll from "react-infinite-scroll-component";

export default function MainFeed(props: any) {

    const {posts, loadMorePosts} = props;

    return (
        <Box maxWidth="xl" style={{position: 'relative'}}>
            <InfiniteScroll
                dataLength={posts.length}
                next={loadMorePosts}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{textAlign: "center"}}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={5}>
                    {posts.map((postElement: any, idx: any) => {
                        return <GroupCardSmall key={idx} info={postElement.info}/>
                    })}
                </Stack>
            </InfiniteScroll>
        </Box>
    )

}
