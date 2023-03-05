import "../App.css"
import { Profile } from "./Profile"

function TopNavBar(){
    return(
        <header id="TopBar">
            <h1 id="Logo">UNited</h1>
            <nav>
                <input id="BuscarGrupos" placeholder="Busca un grupo">
                </input>
                <button id="BotonBuscar">
                    Buscar
                </button>                
            </nav>
            <Profile/> 

        </header>
        
    )
}

export default TopNavBar