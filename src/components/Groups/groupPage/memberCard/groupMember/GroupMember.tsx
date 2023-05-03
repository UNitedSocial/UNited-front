import "./groupMember.css"
import * as React from "react";
import {BiPencil} from "react-icons/bi";

export default function GroupMember({user}: any) {
    return (
        <li className="sidebarFriend">
            <button onClick={() => console.log(user.username)}
                    style={{border: "none", background: "none", padding: "0", font: "inherit", cursor: "pointer"}}>
                <span className="sidearFriendName">
                    {user.username}
                    {"   "}
                    {user.role === "editor" ? <BiPencil /> : null}
                </span>
            </button>
        </li>
    )
}
