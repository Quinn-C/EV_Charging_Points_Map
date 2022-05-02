import Menu from "../Menu/Menu";
import Avatar from "../Avatar/Avatar";
import "./Header.css"

const Header = () =>{

    return(
    <div className="Header">
        <Menu className="Menu"/>
        <Avatar className="Avatar"/>
    </div>
    )
    
}
export default Header