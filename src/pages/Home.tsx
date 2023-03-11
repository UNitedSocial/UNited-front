import TopNavBar from "../components/TopNavBar"
import Feed from "../components/feed/Feed"

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

