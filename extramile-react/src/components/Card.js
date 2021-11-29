import React, {useState} from 'react';
import './Card.css'
import ReactPaginate from "react-paginate"
import { DeleteModal, EditRecordModal } from '../Modals';
import {
  Table,
} from 'react-bootstrap';
function CardResults(props) {
  const [pageNumber,setPageNumber] = useState(0);
  const users = props.data
  const usersPerPage=12
  const pagesVisited = pageNumber*usersPerPage
  const pageCount = Math.ceil(users.length /usersPerPage);
  const changePage = ({selected}) =>{
    setPageNumber(selected)
  }
  return (
    <div className = "app-container">
        <Table hover striped bordered>
          <thead>
            <tr>
              <td>Accidents-ID</td>
              <td>Date</td>
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
                <td>{item.Start_Time.slice(0,10)}</td>
                <td>{item.Street}</td>
                <td>{item.City}</td>
                <td>{item.State}</td>
                <td>{item.Zipcode}</td>
                <td>{item.Severity}</td>
                <td>
                  <EditRecordModal data={item}/>
                  <DeleteModal id={item.ID}/>
                </td>
              </tr> 
            ))}
          </tbody>
        </Table>
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
export default CardResults;
