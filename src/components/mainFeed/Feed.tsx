import "./feed.css"
import {useEffect, useState} from "react";
import {Alert, AlertTitle, Box, CircularProgress, Stack} from "@mui/material";
import GroupCard from "../groupCard/GroupCard";
import {loadPosts} from "../../backendConnection/loadPosts";

export default function Feed(props: any) {

    const [isLoading, setIsLoading] = useState(true);
    const [hasErrorLoading, sethasErrorLoading] = useState<JSON | null>(null);
    const [posts, setPosts] = useState<any[]>([]);

    const allFilters = ['all', 'todos', 'restablecer']
    const topics = ['arduino', 'ingeniería', "matematicas"];
    const dateFilters = ["recientes - antiguos", "antiguos - recientes"]
    const nameFilters = ["A - Z", "Z - A"]

    function compareName(a: any, b: any) {
        if (a.info.name.toLowerCase() < b.info.name.toLowerCase()) {
            return -1;
        }
        if (a.info.name.toLowerCase() > b.info.name.toLowerCase()) {
            return 1;
        }
        // a debe ser igual b
        return 0;
    }

    function compareDate(a: any, b: any) {
        const d1 = new Date(a.info.creationDate).getTime();
        const d2 = new Date(b.info.creationDate).getTime();
        if (d1 < d2) {
            return -1;
        }
        if (d1 > d2) {
            return 1;
        }
        // a debe ser igual b
        return 0;
    }

    useEffect(() => {
        loadPosts().then(data => loadedPosts(data)).catch(error => errorLoading(error));
    }, []);

    const loadedPosts = (data: Array<any>) => {
        try {
            setPosts(data);
            setIsLoading(false);
        } catch {
            errorLoading({} as JSON);
        }
    }

    const errorLoading = (error: JSON) => {
        sethasErrorLoading(error);
        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <>
                <Box
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                >
                    <CircularProgress size={70}
                                      sx={{color: "#0c4c8a"}}/>
                </Box>
            </>
        )
    }

    if (hasErrorLoading !== null) {
        return (
            <>
                <Box maxWidth="false" style={{position: "relative"}}>

                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={5}
                        sx={{width: "100%"}}>
                        <Alert severity="error" sx={{width: "100%"}}>
                            <AlertTitle>Error</AlertTitle>
                            Couldn't retreive information
                        </Alert>
                    </Stack>

                </Box>
            </>
        )
    }


    if (topics.includes(props.filterValueSelected)) {
        return (
            <>
                <Box maxWidth="xl" style={{position: 'relative'}}>

                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={5}>


                        {posts.map((postElement, idx) => {


                            if (postElement.info.topics[0].includes(props.filterValueSelected)) {
                                return <GroupCard key={idx} info={postElement.info}/>
                            }
                        })}
                    </Stack>

                </Box>
            </>)
    } else if (allFilters.includes(props.filterValueSelected)) {
        return (
            <>
                <Box maxWidth="xl" style={{position: 'relative'}}>

                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={5}>


                        {posts.map((postElement, idx) => (

                            <GroupCard key={idx} info={postElement.info}/>
                        ))}

                    </Stack>

                </Box>
            </>
        )
    } else if (dateFilters.includes(props.filterValueSelected)) {
        var postsCopy = posts;
        postsCopy.sort(compareDate);
        return (
            <>
                <Box maxWidth="xl" style={{position: "relative"}}>

                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={5}>


                        {
                            postsCopy.map((postElement, idx) => (

                                <GroupCard key={idx} info={postElement.info}/>
                            ))}

                    </Stack>

                </Box>
            </>
        )
    } else if (nameFilters.includes(props.filterValueSelected)) {
        var postsCopy = posts;
        postsCopy.sort(compareName);
        return (
            <>
                <Box maxWidth="xl" style={{position: 'relative'}}>

                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={5}>


                        {
                            postsCopy.map((postElement, idx) => (

                                <GroupCard key={idx} info={postElement.info}/>
                            ))}

                    </Stack>

                </Box>
            </>
        )
    } else {
        return <></>
    }


}
