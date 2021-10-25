import './Burger.css';

const Burger = (props) => {
    return (
        <button onClick={props.onClick}>
            <div className="burger">
                <div />
                <div />
                <div />
            </div>
        </button>
    );
}

export default Burger;