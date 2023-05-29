import {useNavigate, useParams} from "react-router-dom";
import {Grid, Stack} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getGroup} from "../../backendConnection/Groups/getGroup";
import {useAuth0} from "@auth0/auth0-react";
import ErrorMessage from "../../pages/Error/ErrorMessage";
import LoadingScreen from "../../pages/Loading/LoadingScreen";
import UtilityMenu from "../../components/UtilityMenu/UtilityMenu";
import GroupCard from "../../components/Groups/groupCard/GroupCard";
import RequestsCard from "../../components/Groups/requestsCard/RequestsCard";
import SimilarCard from "../../components/Groups/similarCard/SimilarCard";
import {getGroupSimilar} from "../../backendConnection/Groups/getGroupSimilar";
import {getUserStateGroup} from "../../backendConnection/Users/getUserStateGroup";
import EditCard from "../../components/Groups/editCard/EditCard";
import MemberCard from "../../components/Groups/memberCard/MemberCard";
import Notification from "../../components/Notification/Notification";
import DeleteCard from "../../components/Groups/deleteCard/DeleteCard";
import PreviewSections from "../../components/GroupForm/PreviewSections";


function Group() {

    const {groupname} = useParams();

    const {user, isLoading, isAuthenticated} = useAuth0();

    const [group, setGroup] = useState<any>(null);
    const [userState, setUserState] = useState<any>(null);
    const [groupMembers, setGroupMembers] = useState<any>(null);
    const [groupSimilars, setGroupSimilars] = useState<any>(null);
    const [groupRequests, setGroupRequests] = useState<any>(null);
    const [sections, setSections] = useState<any>([]);

    const [update, setUpdate] = useState<boolean>(false);
    const [isLoadingScreen, setIsLoadingScreen] = useState(false);
    const [notificationDTO, setNotificationDTO] = useState<any>({open: false, message: "", severity: "info"})
    const [hasErrorLoading, sethasErrorLoading] = useState<JSON | null>(null);
    const [isPosting, setIsPosting] = useState(false);
    const navigate = useNavigate();

    const toogleIsLoadingScreen = (value: boolean) => {
        setIsLoadingScreen(value);
    }

    const toogleUpdate = () => {
        setUpdate(!update);
    }

    const toogleHome = () => {
        navigate("/");
    }

    const toogleNotification = (message: string, severity: "success" | "info" | "warning" | "error") => {
        setNotificationDTO({open: true, message: message, severity: severity});
    }

    useEffect(() => {
        toogleIsLoadingScreen(true);
        loadGroupInfo().then(() => {
            console.log("Group loaded");
            toogleIsLoadingScreen(false);
        });
    }, [groupname, user, update]);

    async function loadGroupInfo() {
        await getGroup(groupname).then(data => loadedGroup(data)).catch(error => errorLoading(error));
        await getGroupSimilar(groupname).then(data => loadedGroupSimilar(data)).catch(() => loadedGroupSimilar([]));
        if(isAuthenticated) {
            while (isLoading) {
                await new Promise(r => setTimeout(r, 100));
            }
        }
        await getUserStateGroup(groupname, user?.nickname).then(data => loadedUserState(data)).catch(() => loadedUserState([]));
    }

    const loadedGroup = (data: any) => {
        try {
            setGroup(data);
            setGroupMembers(data.members);
            setGroupRequests(data.requests);
            setSections(data.page.map((section: any) => {
                if(section.type === "title"){
                    return {...section, content: section.content.title}
                } else if(section.type === "subtitle"){
                    return {...section, content: section.content.subtitle}
                } else if(section.type === "paragraph"){
                    return {...section, content: section.content.paragrah}
                } else {
                    return section;
                }
            }));
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

    const loadedGroupSimilar = (data: any) => {
        try {
            setGroupSimilars(data);
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
                        <MemberCard groupMembers={groupMembers} userState={userState} groupName={groupname}
                                    toogleUpdate={toogleUpdate} toogleIsLoadingScreen={toogleIsLoadingScreen}/>
                        <SimilarCard groupSimilars={groupSimilars}/>
                    </Stack>
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <GroupCard group={group} userState={userState} isPosting={isPosting} toogleUpdate={toogleUpdate}
                           toogleIsLoadingScreen={toogleIsLoadingScreen} toogleNotification={toogleNotification}/>
                <PreviewSections sections={sections}/>
            </Grid>

            <Grid item xs={3}>
                <Grid container justifyContent="center">
                    <Stack spacing={4}>
                        <UtilityMenu/>
                        {userState === "editor" ?
                            <>
                                <EditCard/>
                                <DeleteCard userState={userState} groupName={groupname} toogleUpdate={toogleUpdate}
                                            toogleNotification={toogleNotification}
                                            toogleIsLoadingScreen={toogleIsLoadingScreen} toogleHome={toogleHome}/>
                                <RequestsCard groupRequests={groupRequests} toogleUpdate={toogleUpdate}
                                              toogleIsLoadingScreen={toogleIsLoadingScreen}
                                              toogleNotification={toogleNotification}/>
                            </>
                            : null
                        }
                    </Stack>
                </Grid>
            </Grid>

            <Notification notificationDTO={notificationDTO} setNotificationDTO={setNotificationDTO}/>
        </Grid>
    )
}

export default Group
