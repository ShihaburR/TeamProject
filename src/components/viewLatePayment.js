import React, {useState, useEffect} from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import searchIcon from './images/search-icon.png';

function ViewLatePayment(props){
  const [lateData, setData] = useState('');
  const [search, setSearch] = useState("");

  const getLatePayments = () => {
    axios.get('http://localhost:5000/latePayments')
    .then(response => {
      console.log(response.data);
      setData(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    getLatePayments();
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
        <button type="button" class="page-button">View Late Payments</button>
        <div>
          <br/>
          <input type="text" value={search} placeholder= "Enter blank number or id.." class="search_bar"
          required onChange={(e) => setSearch(e.target.value)}/>
          <button type="button" class="search_submit">
            <img src={searchIcon} alt="Search"  height="17.5" width="16"/>
          </button>
          <br/>
          <NavLink to="/mainMenu"><button type="button" class="small-button-right" onclick="document.location = '../Menu/MainMenuManager.html'">Done</button></NavLink>
          <button type="button" class="small-button">Reload Table</button>
        </div>
      </div>
      <div id="tablecontainerrefund">
        <table className="striped responsive-table">
          <thead>
            <tr>
              <th>StaffID</th>
              <th>Staff's Name</th>
              <th>CustomerID</th>
              <th>Blank Number</th>
              <th>Pay Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(lateData) && lateData.length > 0 && lateData.map(r => (
            <tr key={r.blankNumber} id={r.blankNumber}>
              <td align="center">{r.staffID}</td>
              <td align="center">{r.name + " " + r.surname}</td>
              <td align="center">{r.customerID}</td>
              <td align="center">{r.blankNumber}</td>
              <td align="center">{displayDate(r.payByDate)}</td>
            </tr>
            ))}
          </tbody>
        </table>
        <br/>
      </div>
    </body>
  );
}

export default ViewLatePayment;
