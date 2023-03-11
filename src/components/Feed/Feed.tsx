import "./feed.css"
import Post from '../post/Post'
import {Posts} from "../../data"

export default function Feed() {
    return (
      <div className='feed'>
        <div className="feedWrapper">  
          {Posts.map((p:any) =>(
            <Post key = {p.id} post ={p}/>
          ))}
        </div>
      </div>
    )
  }