import './rightBar.css'
import {Group} from '@mui/icons-material'
import {Users,Groups} from "../../data"
import GroupMember from '../groupMember/GroupMember'

export default function RightBar() {
    return(
        <div className='rightbar'>
            <div className="rightbarWrapper">
                <ul className="rightbarList">
                    <li className="rightbarListItem">
                        <Group className='rightbarIcon'/>
                        <span className="rightListItemText">Grupos Similares:</span>
                    </li>

                </ul>
                
                <hr className='rightbarHr'/>
                <ul className="rightbarGroupList">
                    {Groups.map(u=> (
                        <GroupMember key={u.id} user={u}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}