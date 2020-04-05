import React, {useEffect, useState} from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function ViewRefund(props) {

  const [refunds, setRefunds] = useState('');
  const getRefunds = () => {
    axios.get('http://localhost:5000/refunds')
      .then(response => {
        console.log(response.data);
        setRefunds(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  useEffect(() => {
    getRefunds();
  }, [])
  const displayDate = (date) => {
    if(date != null) {
      date = date.toString().slice(0,10);
      return (date);
    } else {
      return(date);
    }
  }

  return (
    <body class="indexbody">
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
        <div id="mainmenu">
            <button type="button" class="page-button">View Refund-Log</button>
        </div>
        <div id="tablecontainerrefund">
        <table className="striped responsive-table">
        <thead>
          <th>Blank Number</th>
          <th>Recieved Date</th>
          <th>Assigned Date</th>
          <th>Origin of Flight</th>
          <th>Destination</th>
        </thead>
        <tbody>
        {Array.isArray(refunds) && refunds.length > 0 && refunds.map(r => (
        <tr key={r.blankNumber} id={r.blankNumber}>
          <td align="center">{r.blankNumber}</td>
          <td align="center">{displayDate(r.recievedDate)}</td>
          <td align="center">{displayDate(r.assignedDate)}</td>
          <td align="center">{r.departureDestination}</td>
          <td align="center">{r.arrivalDestination}</td>
        </tr>
        ))}
        </tbody>
        </table>
            <NavLink to="/mainMenu"><button type="button" class="small-button-right">Done</button></NavLink>

        </div>
    </body>
  );

}
export default ViewRefund;
