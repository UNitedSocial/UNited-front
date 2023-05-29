import {Link} from "react-router-dom";
import * as React from "react";
import "./GroupMapping.css";

export default function GroupMapping({groupName}: any) {
    return (
        <li className="sidebarSimilar">
            <Link to={"/group/" + groupName}>
                <span>{groupName}</span>
            </Link>
        </li>

    )
}