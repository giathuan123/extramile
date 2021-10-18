import React from 'react';
import './Card.css'
class Card extends React.Component{
   
    // Constructor 
    constructor(props) {
      super(props);
 
      this.state = {
          items: [],
          DataisLoaded: false
      };
  }
 
  // ComponentDidMount is used to
  // execute the code 
  componentDidMount() {
      fetch("http://localhost:3001/users/api/endpoint")
          .then((res) => res.json())
          .then((json) => {
              this.setState({
                  items: json,
                  DataisLoaded: true
              });
          })
  }
  render() {
      const { DataisLoaded, items } = this.state;
      if (!DataisLoaded) return <div>
          <h1> Pleses wait some time.... </h1> </div> ;
 
      return (
      <div className = "Accidents">
          <h1> Accident Report </h1>  
          <table>
            <thead>
              <tr>
                <td>Accidents-ID</td>
                <td>Street</td>
                <td>City</td>
                <td>State</td>
                <td>Zip-Code</td>
                <td>Severity</td>
              </tr>
            </thead>
            <tbody>
              {items.map((item)=>(
                <tr>
                  <td>{item.ID}</td>
                  <td>{item.Street}</td>
                  <td>{item.City}</td>
                  <td>{item.State}</td>
                  <td>{item.Zipcode}</td>
                  <td>{item.Severity}</td>
                </tr>
                
              ))}
            </tbody>
          </table>
          
      </div>
  );
}
}
export default Card;
