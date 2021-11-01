import './FormComponent.css';

const FormHeader = (props) => {
    return (
        <div className="form-group">
            {props.header}
        </div>
    );
}

export default FormHeader;