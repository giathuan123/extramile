import React from 'react';

import {Input, Select, FormHeader, Button} from '../FormComponents'

class CreateRecord extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newRecord: {
                street: '',
                city: '',
                state: '',
                zip: '',
                severity: '',
            },

            severityOptions: ['1', '2', '3', '4']
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleStreet = this.handleStreet.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.handleZip = this.handleZip.bind(this);
        this.handleSeverity = this.handleSeverity.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        console.log(this.state.newRecord)
    }

    handleStreet(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            newRecord: {
                ...prevState.newRecord, street: value
            }
        }), )
    }

    handleCity(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            newRecord: {
                ...prevState.newRecord, city: value
            }
        }), );
    }

    handleZip(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            newRecord: {
                ...prevState.newRecord, zip: value
            }
        }), );
    }

    handleSeverity(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            newRecord: {
                ...prevState.newRecord, severity: value
            }
        }), )
    }

    render() {
        return (
            <div className="form-container">
                <form className="form" onSubmit={this.handleFormSubmit}>
                    <FormHeader header="Add Your Accident Data" />
                    <Input
                        title={'Street'}
                        type={'text'}
                        value={this.state.newRecord.street}
                        handleChange={this.handleStreet}
                    />
                    <Input
                        title={'City'}
                        type={'text'}
                        value={this.state.newRecord.city}
                        handleChange={this.handleCity}
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
                        placeholder={'Accident Severity #'}
                        handleChange={this.handleSeverity}
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

export default CreateRecord;