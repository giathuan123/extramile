import React from 'react'
import { Button, Input, Select } from '../FormComponents';

class EditRecord extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newRecord: {
                ID: this.props.data.ID,
                Street: this.props.data.Street,
                City: this.props.data.City,
                State: this.props.data.State,
                Zipcode: this.props.data.Zipcode,
                Severity: this.props.data.Severity,
                Start_Time: this.props.data.Start_Time
            },
            severityOptions: ['1', '2', '3', '4']
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleZip = this.handleZip.bind(this);
    }

    handleFormSubmit(e) {
       // e.preventDefault();
        // DELETE RECORD   
        fetch('http://localhost:3001/users/delete', {
            method: "POST", 
            body: JSON.stringify([this.state.newRecord.ID]),
            headers:{"Content-Type" : "application/json"
            }, 
        })
        .then(res=>console.log(res))

        let data = this.state.newRecord;
        fetch('http://localhost:3001/users/edit', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then ((res) => res.json())
        .then ((data) => {
            console.log(data);
        });
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
                ...prevState.newRecord, Zipcode: value
            }
        }), );
    }

    render() {
        return (
            <div className="form-container">
                <form onSubmit={this.handleFormSubmit}>
                    <Input
                        title={'Street'}
                        name={'Street'}
                        type={'text'}
                        value={this.state.newRecord.Street}
                        handleChange={this.handleInput}
                    />
                    <Input
                        title={'City'}
                        name={'City'}
                        type={'text'}
                        value={this.state.newRecord.City}
                        handleChange={this.handleInput}
                    />
                    <Input
                        title={'State'}
                        name={'State'}
                        type={'text'}
                        value={this.state.newRecord.State}
                        handleChange={this.handleInput}
                    />
                    <Input
                        title={'Zipcode'}
                        name={'Zipcode'}
                        type={'number'}
                        value={this.state.newRecord.Zipcode}
                        handleChange={this.handleZip}
                    />
                    <Select
                        title={'Severity'}
                        name={'Severity'}
                        options={this.state.severityOptions}
                        value={this.state.newRecord.Severity}
                        placeholder={this.state.newRecord.Severity}
                        handleChange={this.handleInput}
                    />
                    {/*<Button
                        title={'Submit'}
                    />*/}
                </form>
            </div>
        );
    }
}

export default EditRecord;
