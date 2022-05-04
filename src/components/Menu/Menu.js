import React, {useState} from 'react';
import "./Menu.css";
import * as FaIcons from "react-icons/fa";
import { IconContext } from 'react-icons';
import * as AiIcons from 'react-icons/ai';



import {Link} from "react-router-dom";

const Menu = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
      <div className="Menu">
      <IconContext.Provider value={{ color: '#111D4A' }} >
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className="nav-text">
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <li className="nav-text">
                <Link to="/" className="nav-text">
                    Home
                </Link>
            </li>
            <li className="nav-text">
                <Link to="/fleet" className="nav-text">
                    Fleet
                </Link>
            </li>
            <li className="nav-text">
                <Link to="/infrastructure" className="nav-text">
                    Infrastructure
                </Link>
            </li>
            <li className="nav-text">
                <Link to="/sales" className="nav-text">
                    Sales
                </Link>
            </li>

            
            
          </ul>
        </nav>
      </IconContext.Provider>
      </div>
    </>

    );
  };
  export default Menu;