import './FormComponent.css'

const Input = (props) => {
    return (
    <div className="form-group">
        <label>{props.title}</label>
        <input
            name={props.name}
            value={props.value}
            type={props.type}
            onChange={props.handleChange}
            placeholder={props.placeholder}
        />
    </div>
    )
}

export default Input;
