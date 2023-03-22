import "./groupMember.css"

export default function CloseFriend({user}:any) {
  return (
    <li className="sidebarFriend">
        <img className='sidebarFriendImg' src={user.profilePicture} alt="" />
        <span className='sidearFriendName'>{user.username}</span>
    </li>
  )
}