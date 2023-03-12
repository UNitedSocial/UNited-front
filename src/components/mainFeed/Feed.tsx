import "./feed.css"
import Post from '../post/Post'
import {useEffect, useState} from "react";
import {Alert, AlertTitle, Box, CircularProgress, Stack} from "@mui/material";
import GroupCard from "../groupCard/GroupCard";

export default function Feed() {

    const [isLoading, setIsLoading] = useState(true);
    const [hasErrorLoading, sethasErrorLoading] = useState<JSON | null>(null);
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        loadPosts().then(data => loadedPosts(data)).catch(error => errorLoading(error));
    }, []);

    async function loadPosts() {
        const response = await fetch('http://localhost:3002/api/groups?n=5');
        const data = await response.json();
        console.log(data)
        return data;
    }

    const loadedPosts = (data: Array<any>) => {
        try {
            data.map((a) => (console.log(a)));
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
                                      sx={{color: '#0c4c8a'}}/>
                </Box>
            </>
        )
    }

    if (hasErrorLoading !== null) {
        return (
            <>
                <Box maxWidth="false" style={{position: 'relative'}}>

                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={5}
                        sx={{width: '100%'}}>
                        <Alert severity="error" sx={{width: '100%'}}>
                            <AlertTitle>Error</AlertTitle>
                            Couldn't retreive information
                        </Alert>
                    </Stack>

                </Box>
            </>
        )
    }

    /*return (
      <div className='feed'>
        <div className="feedWrapper">
          {Posts.map((p:any) =>(
            <Post key = {p.id} post ={p}/>
          ))}
        </div>
      </div>
    )*/

    return (
        <>
            <Box maxWidth="xl" style={{position: 'relative'}}>

                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={5}>
                    {posts.map((postElement, idx) => (
                        <>
                            <GroupCard
                                key={idx}
                                info={postElement.info}
                            />
                            <Post key={postElement.id} post={postElement}/>
                        </>
                    ))}
                </Stack>

            </Box>
        </>
    )
}
