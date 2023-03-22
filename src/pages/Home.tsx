import TopNavBar from "../components/TopNavBar"
import Feed from "../components/mainFeed/Feed"
import GroupForm from "../components/form/GroupForm"
import Leftbar from "../components/leftBar/Leftbar"





function Home (){
    return (<>
            <TopNavBar/>
            <Leftbar/>
            
            <div className={"Content"}>
                <Feed></Feed> 
                   
            </div>
            
            
        </>
    )
}

export default Home

