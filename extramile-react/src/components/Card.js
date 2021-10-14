import React from 'react';

class Card extends React.Component{
  constructor(props){
    this.data = props
  }

  render(){
    return (
      <div>
      <h1>{this.data.date}</h1> 
      <h1>{this.data.street}</h1> 
      <h1>{this.data.city}</h1> 
      <h1>{this.data.state}</h1> 
      <h1>{this.data.zip}</h1> 
      <h1>{this.data.weather}</h1> 
      <h1>{this.data.severity}</h1> 
      </div>
    )
  }
}
