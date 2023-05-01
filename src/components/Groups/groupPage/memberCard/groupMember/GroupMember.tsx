import "./groupMember.css"
import * as React from "react";

export default function GroupMember({user}: any) {
    return (
        <li className="sidebarFriend">
            <button onClick={() => console.log(user.username)}
                    style={{border: "none", background: "none", padding: "0", font: "inherit", cursor: "pointer"}}>
                <span className="sidearFriendName">{user.username}</span>
            </button>
        </li>
    )
}