import React, {useState, useEffect} from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import searchIcon from './images/search-icon.png';

function ViewLatePayment(props){
  const [customers, setData] = useState('');
  const [search, setSearch] = useState("");

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
              <th>Customer's Name</th>
              <th>Blank Number</th>
              <th>Pay Date</th>
              <th>Remind</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> lol </td>
              <td> lol </td>
              <td> lol </td>
              <td> lol </td>
              <td> lol </td>
              <td> lol </td>
              <td> lol </td>
            </tr>

          </tbody>
        </table>
        <br/>
      </div>
    </body>
  );
}

export default ViewLatePayment;
