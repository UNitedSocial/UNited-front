import TopNavBar from "../components/TopNavBar"
import Feed from "../components/mainFeed/Feed"
import GroupForm from "../components/form/GroupForm"

function Home (){
    return (<>
            <TopNavBar/>
            <div className={"Content"}>
                <GroupForm />
            </div>
            
        </>
    )
}

export default Home

