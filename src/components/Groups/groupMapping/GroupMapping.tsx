import {Link} from "react-router-dom";
import * as React from "react";

export default function GroupMapping({group}: any) {
    return (

        <li className="sidebarSimilar">
            <Link to={"/group/" + group?.group?.name}>
                <span>{group?.group?.name}</span>
            </Link>
        </li>

    )
}