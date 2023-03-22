import './leftbar.css'
import {RssFeed, PlayCircleFilledOutlined,Group
        ,Event} from '@mui/icons-material'
import {Users} from "../../data"
import GroupMember from '../groupMember/GroupMember'

export default function LeftBar() {
    return(
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <PlayCircleFilledOutlined className='sidebarIcon'/>
                        <span className="sidebarListItemText">Videos</span>
                    </li>

                    <li className="sidebarListItem">
                        <Event className='sidebarIcon'/>
                        <span className="sidebarListItemText">Eventos</span>
                    </li>
                    <li className="sidebarListItem">
                        <RssFeed className='sidebarIcon'/>
                        <span className="sidebarListItemText">asdasda</span>
                    </li>
                </ul>

                
                <hr className='sidebarHr'/>
                <li className="sidebarListItem">
                        <Group className='sidebarIcon'/>
                        <span className="sidebarItemText">Miembros del grupo:</span>
                </li>
                <ul className="sidebarFriendList">
                    {Users.map(u=> (
                        <GroupMember key={u.id} user={u}/>
                    ))}
                </ul>
                <button className='sidebarButton'>Show More</button>
            </div>
        </div>
    )
}
