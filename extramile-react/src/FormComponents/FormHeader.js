import './FormComponent.css';

const FormHeader = (props) => {
    return (
        <div className="form-group">
            <h1>{props.header}</h1>
        </div>
    );
}

export default FormHeader;