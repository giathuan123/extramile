import React from 'react';

import Input from './formComponents/Input';
import CheckBox from './formComponents/CheckBox'
import Button from './formComponents/Button';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newSearch: {
                date: '',
                street: '',
                city: '',
                state: '',
                zip: '',
                weather: '',
                severity:'',
            },

            weatherOptions: ['Rain', 'Not Raining'],
            severityOptions: ['1', '2', '3', '4']
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleDate= this.handleDate.bind(this);
        this.handleStreet = this.handleStreet.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.handleState = this.handleState.bind(this);
        this.handleZip = this.handleZip.bind(this);
        this.handleRain = this.handleRain.bind(this);
        this.handleSeverity = this.handleSeverity.bind(this);
    }

    // Handle Functions -- They are called when the user interacts
    // with the corresponding field on the form

    handleFormSubmit(e) {
        e.preventDefault();

        let data = this.state.newSearch;

        // Fetch request -- Change this to use an API maybe???
        fetch('http://localhost:3001/users/api', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then ((res) => res.json())
        .then ((data) => {
          this.props.renderData([data]);
        });
        
    }
    handleDate(e) {
        let value = e.target.value;
        this.setState( prevState => ({
            newSearch: {
                ...prevState.newSearch, date: value
            }
        }), () => console.log(this.state.newSearch))
    }

    handleStreet(e) {
        let value = e.target.value;
        this.setState( prevState => ({
            newSearch: {
                ...prevState.newSearch, street: value
            }
        }), () => console.log(this.state.newSearch))
    }

    handleCity(e) {
        let value = e.target.value;
        this.setState( prevState => ({
            newSearch: {
                ...prevState.newSearch, city: value
            }
        }), )
    }

    handleState(e) {
        let value = e.target.value;
        this.setState( prevState => ({
            newSearch: {
                ...prevState.newSearch, state: value
            }
        }), )
    }

    handleZip(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            newSearch: {
                ...prevState.newSearch, zip: value
            }
        }), )
    }

    handleRain(e) {
        const newUserClick = e.target.value;
        let newCheckboxArray;

        if(this.state.newSearch.weather.indexOf(newUserClick) > -1) {
            newCheckboxArray = this.state.newSearch.weather.filter(s => s !== newUserClick);
        }
        else {
            newCheckboxArray = [...this.state.newSearch.weather, newUserClick];
        }

        this.setState(prevState => ({
            newSearch: {
                ...prevState.newSearch, weather: newCheckboxArray
            }
        }))
    }

    handleSeverity(e) {
        const newUserClick = e.target.value;
        let newCheckboxArray;

        if(this.state.newSearch.severity.indexOf(newUserClick) > -1) {
            newCheckboxArray = this.state.newSearch.severity.filter(s => s !== newUserClick);
        }
        else {
            newCheckboxArray = [...this.state.newSearch.severity, newUserClick];
        }

        this.setState(prevState => ({
            newSearch: {
                ...prevState.newSearch, severity: newCheckboxArray
            }
        }))
    }

    render() {
        return (
        <form onSubmit={this.handleFormSubmit}>
            <p>Search Form</p>
            <Input
                title={'Date'}
                type={'date'}
                value={this.state.newSearch.date}
                handleChange={this.handleDate}
            />
            <Input 
                title={'Street'}
                type={'text'}
                placeholder={'Enter street address'}
                value={this.state.newSearch.street}
                handleChange={this.handleStreet}
            />
            <Input
                title={'City'}
                type={'text'}
                placeholder={'Enter city name'}
                value={this.state.newSearch.city}
                handleChange={this.handleCity}
            />
            <Input
                title={'State'}
                type={'text'}
                placeholder={'CA'}
                value={this.state.newSearch.state}
                handleChange={this.handleState}
            />
            <Input
                title={'Zip Code'}
                type={'number'}
                placeholder={'Enter zip code'}
                value={this.state.newSearch.zip}
                handleChange={this.handleZip}
            />
            <CheckBox
                title={'Weather'}
                name={'checkWeather'}
                options={this.state.weatherOptions}
                selectedOptions={this.state.newSearch.weather}
                handleChange={this.handleRain}
            />
            <CheckBox
                title={'Accident Severity'}
                name={'checkSeverity'}
                options={this.state.severityOptions}
                selectedOptions={this.state.newSearch.severity}
                handleChange={this.handleSeverity}
            />
            <Button
                title={'Submit'}
                onClick={this.handleFormSubmit}
            />
        </form>
        );
    }
}

export default SearchForm;
