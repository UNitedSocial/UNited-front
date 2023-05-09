import "./group.css"
import {useParams} from "react-router-dom";
import {Grid, Stack} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getGroup} from "../../backendConnection/Groups/getGroup";
import {useAuth0} from "@auth0/auth0-react";
import ErrorMessage from "../../pages/Error/ErrorMessage";
import LoadingScreen from "../../pages/Loading/LoadingScreen";
import UtilityMenu from "../../components/UtilityMenu/UtilityMenu";
import GroupCard from "../../components/Groups/groupPage/groupCard/GroupCard";
import RequestsCard from "../../components/Groups/groupPage/requestsCard/RequestsCard";
import MemberCard from "../../components/Groups/groupPage/memberCard/MemberCard";
import SimilarCard from "../../components/Groups/groupPage/similarCard/SimilarCard";
import {getGroupMembers} from "../../backendConnection/Groups/getGroupMembers";
import {getGroupSimilar} from "../../backendConnection/Groups/getGroupSimilar";
import {getGroupRequests} from "../../backendConnection/Groups/getGroupRequests";
import {getUserStateGroup} from "../../backendConnection/Users/getUserStateGroup";
import EditCard from "../../components/Groups/groupPage/editCard/EditCard";
import AddSections from "./AddSections";


function Group() {

    const {groupname} = useParams();

    const {user, isLoading} = useAuth0();

    const [group, setGroup] = useState<any>(null);
    const [userState, setUserState] = useState<any>(null);
    const [groupMembers, setGroupMembers] = useState<any>(null);
    const [groupSimilars, setGroupSimilars] = useState<any>(null);
    const [groupRequests, setGroupRequests] = useState<any>(null);

    const [isLoadingScreen, setIsLoadingScreen] = useState(true);
    const [hasErrorLoading, sethasErrorLoading] = useState<JSON | null>(null);
    const [isPosting, setIsPosting] = useState(false);

    useEffect(() => {
        setIsLoadingScreen(true);
        loadGroupInfo().then(() => setIsLoadingScreen(false)).catch(error => errorLoading(error));
    }, [groupname, user, isLoadingScreen]);

    async function loadGroupInfo() {
        getGroup(groupname).then(data => loadedGroup(data));
        getUserStateGroup(groupname, user?.nickname).then(data => loadedUserState(data))
        getGroupMembers(groupname).then(data => loadedGroupMembers(data));
        getGroupSimilar(groupname).then(data => loadedGroupSimilar(data));
        getGroupRequests(groupname).then(data => loadedGroupRequests(data));
    }

    const loadedGroup = (data: any) => {
        try {
            setGroup(data);
        } catch {
            errorLoading({} as JSON);
        }
    }

    const loadedUserState = (data: any) => {
        try {
            setUserState(data);
        } catch {
            errorLoading({} as JSON);
        }
    }

    const loadedGroupMembers = (data: any) => {
        try {
            setGroupMembers(data);
        } catch {
            errorLoading({} as JSON);
        }
    }

    const loadedGroupSimilar = (data: any) => {
        try {
            setGroupSimilars(data);
        } catch {
            errorLoading({} as JSON);
        }
    }

    const loadedGroupRequests = (data: any) => {
        try {
            setGroupRequests(data);
        } catch {
            errorLoading({} as JSON);
        }
    }

    const errorLoading = (error: JSON) => {
        sethasErrorLoading(error);
        setIsLoadingScreen(false);
    }

    if (isLoadingScreen) {
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
                    <Stack spacing={4}>
                        <MemberCard groupMembers={groupMembers}/>
                        <SimilarCard groupSimilars={groupSimilars}/>
                    </Stack>
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <GroupCard group={group} userState={userState} isPosting={isPosting}/>
                <AddSections/>
            </Grid>

            <Grid item xs={3}>
                <Grid container justifyContent="center">
                    <Stack spacing={4}>
                        <UtilityMenu/>
                        <EditCard />
                        <RequestsCard groupRequests={groupRequests}/>            

                    </Stack>
                </Grid>
            </Grid>
            
        </Grid>
    )
}

export default Group
