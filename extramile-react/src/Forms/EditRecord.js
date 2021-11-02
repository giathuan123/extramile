import React from 'react'
import { Button, Input, Select } from '../FormComponents';

class EditRecord extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newRecord: {
                street: this.props.data.Street,
                city: this.props.data.City,
                state: this.props.data.State,
                zip: this.props.data.Zipcode,
                severity: this.props.data.Severity
            },
            severityOptions: ['1', '2', '3', '4']
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleZip = this.handleZip.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        // Send update request here
        console.log(this.state.newRecord)
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState( prevState => ({
            newRecord: {
                ...prevState.newRecord, [name]: value
            }
        }))

    }

    handleZip(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            newRecord: {
                ...prevState.newRecord, zip: value
            }
        }), );
    }

    render() {
        return (
            <div className="form-container">
                <form onSubmit={this.handleFormSubmit}>
                    <Input
                        title={'street'}
                        name={'street'}
                        type={'text'}
                        value={this.state.newRecord.street}
                        handleChange={this.handleInput}
                    />
                    <Input
                        title={'City'}
                        name={'city'}
                        type={'text'}
                        value={this.state.newRecord.city}
                        handleChange={this.handleInput}
                    />
                    <Input
                        title={'State'}
                        name={'state'}
                        type={'text'}
                        value={this.state.newRecord.state}
                        handleChange={this.handleInput}
                    />
                    <Input
                        title={'Zip Code'}
                        name={'zip'}
                        type={'number'}
                        value={this.state.newRecord.zip}
                        handleChange={this.handleZip}
                    />
                    <Select
                        title={'Severity'}
                        name={'severity'}
                        options={this.state.severityOptions}
                        value={this.state.newRecord.severity}
                        placeholder={this.state.newRecord.severity}
                        handleChange={this.handleInput}
                    />
                    <Button
                        title={'Submit'}
                        onClick={this.handleFormSubmit}
                    />
                </form>
            </div>
        );
    }
}

export default EditRecord;