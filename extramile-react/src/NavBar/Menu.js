import './Menu.css';
import { Link } from 'react-router-dom';

const Menu = (props) => {

    return(
        <>
        {props.isOpen &&
            <div className="menu">
                <Link to="/bar">Bar Data</Link>
                <Link to="/statesMap">States Map</Link>
                <Link to="/countiesMap">Counties Map</Link>
                <Link to="calendar">Calendar</Link>
                <Link to="/pie">Pie</Link>
            </div>
        }
        </>
    );
}

export default Menu;