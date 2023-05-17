import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Grid} from "@mui/material";
import GroupForm from "../../components/GroupForm/GroupForm";
import UtilityMenu from "../../components/UtilityMenu/UtilityMenu";
import {useAuth0} from "@auth0/auth0-react";
import {getGroup} from "../../backendConnection/Groups/getGroup";
import {getUserStateGroup} from "../../backendConnection/Users/getUserStateGroup";
import LoadingScreen from "../Loading/LoadingScreen";
import ErrorMessage from "../Error/ErrorMessage";
import dayjs from "dayjs";

export default function EditGroup(props: any) {

    const {groupname} = useParams();

    const {user, isLoading} = useAuth0();

    const [groupElement, setGroupElement] = useState<any>();
    const [sections, setSections] = useState<any>();
    const [userState, setUserState] = useState<any>(null);

    const [isLoadingState, setIsLoadingState] = useState(true);
    const [hasErrorLoading, sethasErrorLoading] = useState<JSON | null>(null);

    useEffect(() => {
        toogleIsLoadingState(true);
        loadGroupInfo().then(() => toogleIsLoadingState(false));
    }, []);

    const toogleIsLoadingState = (value: boolean) => {
        setIsLoadingState(value);
    }

    useEffect(() => {
        setIsLoadingState(true);
        loadGroupInfo().then(() => setIsLoadingState(false)).catch(error => errorLoading(error));
    }, [groupname, user, isLoading]);

    async function loadGroupInfo() {
        await getGroup(groupname).then(data => loadedGroup(data)).catch(error => errorLoading(error));
        await getUserStateGroup(groupname, user?.nickname).then(data => loadedUserState(data)).catch(error => errorLoading(error))
    }

    const loadedGroup = (data: any) => {
        try {
            const loadedGroup = {group: data};
            loadedGroup.group.info.creationDate = dayjs(loadedGroup?.group?.info?.creationDate);
            loadedGroup.group.info.fundationDate = dayjs(loadedGroup?.group?.info?.fundationDate);
            setSections(data.page);
            setGroupElement(loadedGroup);
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

    if (isLoadingState) {
        return (
            <LoadingScreen/>
        )
    }

    if (hasErrorLoading !== null) {
        return (
            <ErrorMessage/>
        )
    }

    if (groupElement !== undefined && userState === "editor") {
        return (
            <Grid container>
                <Grid item xs={3}>
                    <Grid container justifyContent="center">
                        <></>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <GroupForm group={groupElement} sections={sections} edit={true}/>
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
