import "./feed.css"
import { useEffect, useState } from "react";
import { Alert, AlertTitle, Box, CircularProgress, Stack } from "@mui/material";
import GroupCard from "../groupCard/GroupCard";
import { loadPosts } from "../../backendConnection/loadPosts";

export default function Feed(props: any) {

    const topics = ['arduino','ingeniería']; 

    const [isLoading, setIsLoading] = useState(true);
    const [hasErrorLoading, sethasErrorLoading] = useState<JSON | null>(null);
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        loadPosts().then(data => loadedPosts(data)).catch(error => errorLoading(error));
    }, []);

    const loadedPosts = (data: Array<any>) => {
        try {
            setPosts(data);
            setIsLoading(false);
        } catch {
            errorLoading(JSON.parse('{}'));
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
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <CircularProgress size={70}
                        sx={{ color: '#0c4c8a' }} />
                </Box>
            </>
        )
    }

    if (hasErrorLoading !== null) {
        return (
            <>
                <Box maxWidth="false" style={{ position: 'relative' }}>

                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={5}
                        sx={{ width: '100%' }}>
                        <Alert severity="error" sx={{ width: '100%' }}>
                            <AlertTitle>Error</AlertTitle>
                            Couldn't retreive information
                        </Alert>
                    </Stack>

                </Box>
            </>
        )
    }
    

    if (topics.includes(props.filterValueSelected)) {return (
        <>
            <Box maxWidth="xl" style={{ position: 'relative' }}>

                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={5}>


                    {posts.map((postElement, idx) => {

                        console.log(postElement.info.topics[0])
                        if (postElement.info.topics[0].includes(props.filterValueSelected)) {
                            return <GroupCard key={idx} info={postElement.info} />
                        }
                    })}
                </Stack>

            </Box>
        </>)
    }


    else if (props.filterValueSelected === 'all') {return (
        <>
            <Box maxWidth="xl" style={{ position: 'relative' }}>

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
    )}

    else{
        return <></>}



}
