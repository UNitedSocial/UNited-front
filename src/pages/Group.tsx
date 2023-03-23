import TopNavBar from "../components/TopNavBar"
import Feed from "../components/mainFeed/Feed"
import Leftbar from "../components/leftBar/Leftbar"
import RightBar from "../components/rightBar/RightBar"
import "./group.css"


function Group() {
    return (<>
        <TopNavBar />

        < div className="profile">
            <Leftbar></Leftbar>
            <div className="profileRight">
                <div className="profilerightTop">
                    <div className="profileCover">
                        <img className='profileCoverImg' src="assets/persons/4.png" alt="" />
                        <img className='profileUserImg' src="assets/persons/1.jpg" alt="" />
                        
                    </div>
                    <div className="profileInfo">
                        <h4 className='profileInfoName'>Nombre de grupo</h4>
                        <span className='profileInfoDesc'>descripción</span>
                        <button className='groupButton'>Unirme</button>
                    </div>
                </div>


                <div className="profilerightBottom">
                    <Feed />
                    <RightBar></RightBar>


                </div>
                

            </div>

        </div>



    </>
    )
}

export default Group