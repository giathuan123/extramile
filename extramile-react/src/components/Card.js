import React from 'react';
import './Card.css'
import {Button} from '../FormComponents';

function Card(props) {
  return (
    <div className = "app-container">
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
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {props.data.map((item)=>(
              <tr key={item.ID}>
                <td>{item.ID}</td>
                <td>{item.Street}</td>
                <td>{item.City}</td>
                <td>{item.State}</td>
                <td>{item.Zipcode}</td>
                <td>{item.Severity}</td>
                <td><Button title="Edit"/><Button title = "Delete"/></td>
              </tr>  
            ))}
          </tbody>
        </table>
    </div>
  );
}
export default Card;
