import './Nav.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Burger from './Burger';
import Menu from './Menu';

const Nav = () => {
    const [menuIsOpen, setMenu] = useState(false);

    function toggleMenu() {
        setMenu(menuIsOpen ? false : true);
    }

    return (
        <nav className="nav-bar">
          <div className="nav-content">
            <div className="nav-left">
              <Link className="nav-button" to="/">
                <h1>Extramile</h1>
              </Link>
            </div>
            <div className="nav-right">
                <Link className="nav-button" to="/search">
                    <img src="/images/search.png" alt="Search" width="30" height="30"/>
                </Link>
                <a className="nav-button">
                  <Burger onClick={toggleMenu} />
                </a>
            </div>
          </div>
          <Menu isOpen={menuIsOpen} />
        </nav>
    );
}

export default Nav;