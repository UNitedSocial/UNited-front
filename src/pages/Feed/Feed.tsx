import "./feed.css"
import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import {loadPosts} from "../../backendConnection/Groups/loadPosts";
import MainFeed from "./center/MainFeed";
import LoadingScreen from "../../pages/Loading/LoadingScreen";
import ErrorMessage from "../../pages/Error/ErrorMessage";
import FilterFeed from "./left/FilterFeed";
import UtilityMenu from "../../components/UtilityMenu/UtilityMenu";
import {useLocation, useParams} from "react-router-dom";
import {searchGroup} from "../../backendConnection/Groups/searchGroup";

export default function Feed(props: any) {

    const [isLoading, setIsLoading] = useState(true);
    const [hasErrorLoading, sethasErrorLoading] = useState<JSON | null>(null);

    const [posts, setPosts] = useState<any[]>([]);
    const [filters, setFilters] = useState<any[]>([]);

    const location = useLocation();
    let {query} = useParams();

    useEffect(() => {
        loadPosts().then(data => loadedPosts(data)).catch(error => errorLoading(error));
    }, []);

    useEffect(() => {
        if (location.pathname.startsWith("/search")) {
            setIsLoading(true)
            searchGroup(query).then(data => loadedPosts(data)).catch(error => errorLoading(error));
        } else {
            setIsLoading(true)
            loadPosts().then(data => loadedPosts(data)).catch(error => errorLoading(error));
        }
    }, [location, query]);

    const loadedPosts = (data: Array<any>) => {
        try {
            setPosts(data);
            setIsLoading(false);
            sethasErrorLoading(null);
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
            <LoadingScreen/>
        )
    }

    if (hasErrorLoading !== null) {
        return (
            <ErrorMessage/>
        )
    }

    //TODO: Add filters functionality

    return (
        <Grid container>
            <Grid item xs={3}>
                <Grid container justifyContent="center">
                    <FilterFeed filters={filters} setFilters={setFilters}/>
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <MainFeed posts={posts}/>
            </Grid>

            <Grid item xs={3}>
                <Grid container justifyContent="center">
                    <UtilityMenu/>
                </Grid>
            </Grid>
        </Grid>
    )
}
