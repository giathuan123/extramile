import React, {useState} from 'react';
import './Card.css'
import {Button} from '../FormComponents';
import ModalContainer from '../ModalContainer'
import {EditRecordForm} from '../Forms'
import ReactPaginate from "react-paginate"
function Card(props) {
  const [pageNumber,setPageNumber] = useState(0);
  const users = props.data
  const usersPerPage=12
  const pagesVisited = pageNumber*usersPerPage
  console.log(users)
  const pageCount = Math.ceil(users.length /usersPerPage);
  const changePage = ({selected}) =>{
    setPageNumber(selected)
  }
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
            {users.slice(pagesVisited,pagesVisited+usersPerPage).map((item)=>(
              <tr key={item.ID}>
                <td>{item.ID}</td>
                <td>{item.Street}</td>
                <td>{item.City}</td>
                <td>{item.State}</td>
                <td>{item.Zipcode}</td>
                <td>{item.Severity}</td>
                <td>
                  <ModalContainer triggerText="Edit">
                    <EditRecordForm data={item} />
                  </ModalContainer>
                  <Button action={
                    ()=>{
                    fetch('http://localhost:3001/users/delete', 
                      {method: "post", headers:{"Content-Type":"application/json"}, body: JSON.stringify([item.ID])}).then(response=>console.log(response))}} title = "Delete"/>
                </td>
              </tr> 
            ))}
          </tbody>
        </table>
        <ReactPaginate 
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationButton"}
              previousLinkClassName={"previousButton"}
              nextLinkCLassName={"nextButton"}
              activeClassName={"paginationActive"}
            />
    </div>
  );
}
export default Card;
