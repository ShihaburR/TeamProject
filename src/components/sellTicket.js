import React from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';

function SellTicket(props) {
  return (
    <body class="indexbody">
    ​
      <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
      ​
      <div id="mainmenu">
          ​
          <button type="button" class="page-button">Select Ticket</button>
          ​
      </div>
      ​
      <div id="tablecontainerrefund">
          <table align="center">
              <tr>
                  <th>List of Blanks</th>
              </tr>
              <tr>
                  <td>test placeholder</td>
              </tr>
          </table>
          <button type="button" class="small-button">Select</button>
          <button type="button" class="small-button">Mark Void</button>
          ​
          <NavLink to="/mainMenu"><button type="button" class="small-button-right">Done</button></NavLink>
      </div>
    ​</body>
  );
}

export default SellTicket;