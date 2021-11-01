const Button = (props) => {
    return (
        <button className="btn-primary" onClick={props.action}>
          {props.title}
        </button>
    );
}

export default Button;
