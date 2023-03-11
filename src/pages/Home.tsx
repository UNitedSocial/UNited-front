import TopNavBar from "../components/TopNavBar"
import Feed from "../components/mainFeed/Feed"

function Home (){
    return (<>
            <TopNavBar/>

            <div className={"Content"}>
                <Feed />
            </div>
        </>
    )
}

export default Home

