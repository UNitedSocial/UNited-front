import {useEffect, useState} from "react";
import GroupCard from "../groupCard/GroupCard";
import {searchGroup} from "../../backendConnection/searchGroup";
import {Alert, AlertTitle, Box, CircularProgress, Stack, Typography} from "@mui/material";
import {useParams} from "react-router-dom";

export default function SearchPage() {

    let {query} = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [hasErrorLoading, sethasErrorLoading] = useState<JSON | null>(null);
    const [Querygroup, setQuerygroup] = useState<any[]>([]);

    useEffect(() => {
        setIsLoading(true)
        searchGroup(query).then(data => searchedGroups(data)).catch(error => errorLoading(error));
    }, [query]);

    const searchedGroups = (data: Array<any>) => {
        try {
            setQuerygroup(data);
            setIsLoading(false);
            sethasErrorLoading(null);
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

    return (
        <>
            <Box maxWidth="xl" style={{position: 'relative'}}>

                <Typography sx={{mb: 2}}>
                    Search results for: {query}
                </Typography>

                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={5}>
                    {Querygroup.map((postElement, idx) => (
                        <GroupCard
                            key={idx}
                            info={postElement.info}
                        />
                    ))}
                </Stack>

            </Box>
        </>
    )
}


