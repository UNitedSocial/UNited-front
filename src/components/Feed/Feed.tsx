import Post from "./Post";
import {styled} from "@mui/material/styles"
import {Box, Paper, Grid, Container, Stack, CircularProgress, Alert, AlertTitle} from "@mui/material"
import {useEffect, useState} from "react";

function Feed(){

    const[isLoading, setIsLoading] = useState(true);
    const[hasErrorLoading, sethasErrorLoading] = useState<JSON | null>(null);
    const[posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        loadPosts().then(data => loadedPosts(data)).catch(error => errorLoading(error));
    }, []);

    async function loadPosts() {
        const response = await fetch('http://localhost:3002/api/groups?n=5');
        const data = await response.json();
        return data;
    }

    const loadedPosts = (data : Array<Post>) => {
        setPosts(data);
        setIsLoading(false);
    }

    const errorLoading = (error : JSON) => {
        sethasErrorLoading(error);
        setIsLoading(false);
    }

    if(isLoading){
        return(
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
                                      sx={{color: '#0c4c8a'}}/>
                </Box>
            </>
        )
    }

    if(hasErrorLoading !== null){
        return(
            <>
                <Box maxWidth="false" style={{ position: 'relative'}}>

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

    return (
        <>
            <Box maxWidth="xl" style={{ position: 'relative'}}>

                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={5}>
                        {posts.map((postElement, idx) => (
                            <Post
                                key={idx}
                                info={postElement.info}
                            />
                        ))}
                </Stack>

            </Box>
        </>
    )
}

export default Feed
