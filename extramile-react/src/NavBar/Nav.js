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
              <Link to="/">Home</Link>
            </div>
            <div className="nav-right">
                <Link to="/search">
                    <img src="/images/search.png" alt="Search" width="25" height="25"/>
                </Link>
                <Burger onClick={toggleMenu} />
            </div>
          </div>
          <Menu isOpen={menuIsOpen} />
        </nav>
    );
}

export default Nav;