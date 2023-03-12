import React, {useState} from 'react'
import "./post.css"
import {GroupAdd, ThumbUp} from "@mui/icons-material"
import {Users} from "../../data"

export default function Post({post}: any) {

    const [like] = useState(post.like)

    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className='postProfileImg'
                             src={Users.filter((u) => u.id === post.userId)[0].profilePicture}
                             alt=""/>
                        <span className="postUsername">
                  {Users.filter((u) => u.id === post.userId)[0].username}
                  </span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <GroupAdd/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img className='postImg' src={post.photo} alt=""/>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <ThumbUp className='likeIcon'/>

                        <span className="postLikeCounter">{like}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommenttext">{post.comment} commentarios</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
