import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Grid} from "@mui/material";
import GroupForm from "../../components/Groups/groupForm/GroupForm";
import UtilityMenu from "../../components/UtilityMenu/UtilityMenu";
import {useAuth0} from "@auth0/auth0-react";
import {getGroup} from "../../backendConnection/Groups/getGroup";
import {getUserStateGroup} from "../../backendConnection/Users/getUserStateGroup";
import LoadingScreen from "../Loading/LoadingScreen";
import ErrorMessage from "../Error/ErrorMessage";
import {GroupElement} from "../../interfaces/Groups/GroupElement";

export default function EditGroup(props: any) {

    const {groupname} = useParams();

    const {user, isLoading} = useAuth0();

    const [groupElement, setGroupElement] = useState<any>();
    const [userState, setUserState] = useState<any>(null);

    const [isLoadingState, setIsLoadingState] = useState(true);
    const [hasErrorLoading, sethasErrorLoading] = useState<JSON | null>(null);
    const [isPosting, setIsPosting] = useState(false);

    useEffect(() => {
        loadGroupInfo().then(() => setIsLoadingState(false)).catch(error => errorLoading(error));
    }, []);

    useEffect(() => {
        setIsLoadingState(true);
        loadGroupInfo().then(() => setIsLoadingState(false)).catch(error => errorLoading(error));
    }, [groupname, user, isLoading]);

    async function loadGroupInfo() {
        getGroup(groupname).then(data => loadedGroup(data));
        getUserStateGroup(groupname, user?.nickname).then(data => loadedUserState(data))
    }

    const loadedGroup = (data: any) => {
        try {
            setGroupElement(data as GroupElement);
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

    const errorLoading = (error: JSON) => {
        sethasErrorLoading(error);
        setIsLoadingState(false);
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

    if(groupElement !== undefined){
        return (

            <Grid container>
                <Grid item xs={3}>
                    <Grid container justifyContent="center">
                        <></>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <GroupForm group={groupElement}/>
                </Grid>

                <Grid item xs={3}>
                    <Grid container justifyContent="center">
                        <UtilityMenu/>
                    </Grid>
                </Grid>
            </Grid>

        )
    } else {
        return (
            <></>
        )
    }

}
