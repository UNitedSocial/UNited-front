import React, {useEffect, useState} from "react";
import {Grid, Stack} from "@mui/material";
import {loadPosts} from "../../backendConnection/Groups/loadPosts";
import LoadingScreen from "../../pages/Loading/LoadingScreen";
import ErrorMessage from "../../pages/Error/ErrorMessage";
import UtilityMenu from "../../components/UtilityMenu/UtilityMenu";
import {useLocation, useParams} from "react-router-dom";
import {searchGroup} from "../../backendConnection/Groups/searchGroup";
import FilterFeed from "../../components/Feed/left/FilterFeed";
import MainFeed from "../../components/Feed/center/MainFeed";
import PopularGroups from "../../components/Feed/right/PopularGroups";
import NewGroups from "../../components/Feed/right/NewGroups";
import {loadNew} from "../../backendConnection/Groups/loadNew";
import {loadPopular} from "../../backendConnection/Groups/loadPopular";


export default function Feed(props: any) {

    const [isLoading, setIsLoading] = useState(true);
    const [hasErrorLoading, sethasErrorLoading] = useState<JSON | null>(null);

    const [posts, setPosts] = useState<any[]>([]);
    const [popularGroups, setPopularGroups] = useState<any[]>([]);
    const [newGroups, setNewGroups] = useState<any[]>([]);
    const [feedPage, setFeedPage] = useState<number>(5);
    const [filters, setFilters] = useState<any>({filter: "", value: ""});
    const [orders, setOrders] = useState<any>({order: ""});
    const [descending, setDescending] = useState<string>("no");

    const location = useLocation();
    let {query} = useParams();
    
    const toogleIsLoading = (value: boolean) => {
        setIsLoading(value);
    }

    useEffect(() => {
        toogleIsLoading(true);
        handleFirstLoad().then(() => toogleIsLoading(false));
    }, []);

    useEffect(() => {
        toogleIsLoading(true)
        handleComponentLoaded(false).then(() => toogleIsLoading(false));
    }, [location, query, filters, orders, descending]);

    const handleFirstLoad = async () => {
        await loadPopular().then(data => loadedPopular(data)).catch(() => loadedPopular([]));
        await loadNew().then(data => loadedNew(data)).catch(() => loadedPopular([]));
        await handleComponentLoaded(true);
    }

    const handleComponentLoaded = async (first: boolean) => {
        toogleIsLoading(true);
        if (location.pathname.startsWith("/search")) {
            setIsLoading(true)
            await searchGroup(query, filters, orders, descending).then(data => loadedPosts(data, false)).catch(error => errorLoading(error));
        } else {
            setIsLoading(true)
            await loadPosts(0).then(data => loadedPosts(data, first)).catch(error => errorLoading(error));
        }
    }

    const loadedPosts = (data: Array<any>, concat: boolean) => {
        try {
            if (concat) {
                setPosts(posts.concat(data));
            } else {
                setPosts(data);
                toogleIsLoading(false);
                sethasErrorLoading(null);
            }
        } catch {
            errorLoading({} as JSON);
        }
    }

    const loadedPopular = (data: Array<any>) => {
        try {
            setPopularGroups(data);
        } catch {
            // errorLoading({} as JSON);
        }
    }

    const loadedNew = (data: Array<any>) => {
        try {
            setNewGroups(data);
        } catch {
            // errorLoading({} as JSON);
        }
    }

    const errorLoading = (error: JSON) => {
        sethasErrorLoading(error);
        setIsLoading(false);
    }

    const loadMorePosts = () => {
        if (!location.pathname.startsWith("/search")) {
            loadPosts(feedPage).then(data => loadedPosts(data, true)).catch(error => errorLoading(error));
            setFeedPage(feedPage + 5)
        }
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

    return (
        <Grid container>
            <Grid item xs={3}>
                <Grid container justifyContent="center">
                    {
                        location.pathname.startsWith("/search") ?
                            <FilterFeed filters={filters} setFilters={setFilters} orders={orders} setOrders={setOrders}
                                        descending={descending} setDescending={setDescending}/> : null
                    }
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <MainFeed posts={posts} loadMorePosts={loadMorePosts}/>
            </Grid>

            <Grid item xs={3}>
                <Grid container justifyContent="center">
                    <Stack spacing={4}>
                        <UtilityMenu/>
                        <PopularGroups popularGroups={popularGroups}/>
                        <NewGroups newGroups={newGroups}/>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    )
}
