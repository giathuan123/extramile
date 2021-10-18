import React from 'react'
import { Input, Select } from '../FormComponents';

class EditRecord extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newRecord: {
                street: '',
                city: '',
                state: '',
                zip: '',
                severity: ''
            },
            severityOptions: ['1', '2', '3', '4']
        }
    }

    componentDidMount() {
        let info = this.props.data;
        this.setState( () => ({
            newRecord: {
                street: info.Street,
                city: info.City,
                state: info.State,
                zip: info.Zipcode,
                severity: info.Severity
            }
        }), );
        console.log(this.props.data);
    }

    handleInput() {

    }

    handleZip() {

    }

    render() {
        return (
            <div className="form-container">
                <form>
                    <Input
                        title={'street'}
                        type={'text'}
                        value={this.state.newRecord.street}
                        handleChange={this.handleInput}
                    />
                    <Input
                        title={'City'}
                        type={'text'}
                        value={this.state.newRecord.city}
                        handleChange={this.handleInput}
                    />
                    <Input
                        title={'State'}
                        type={'text'}
                        value={this.state.newRecord.state}
                        handleChange={this.handleInput}
                    />
                    <Input
                        title={'Zip Code'}
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
                </form>
            </div>
        );
    }
}

export default EditRecord;