import './Menu.css';
import { Link } from 'react-router-dom';

const Menu = (props) => {

    return(
        <>
        {props.isOpen &&
            <div className="menu">
                <Link to="/bar">Bar Data</Link>
                <Link to="/maps">Maps</Link>
                <Link to="calendar">Calendar</Link>
            </div>
        }
        </>
    );
}

export default Menu;