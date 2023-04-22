import {Link} from "react-router-dom";
import * as React from "react";

export default function GroupSimilar({group}: any) {
    return (

        <li className="sidebarSimilar">
            <Link to={"/group/" + group?.group?.name}>
                <span>{group?.group?.name} - {group?.topics[0]}</span>
            </Link>
        </li>

    )
}