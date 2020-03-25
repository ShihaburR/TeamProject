import React from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';

function ViewRefund(props) {
  return (
    <body class="indexbody">
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

        <div id="mainmenu">

            <button type="button" class="page-button">View Refund-Log</button>

        </div>

        <div id="tablecontainerrefund">
            <table align="center">
                <tr>
                    <th>View Refunds</th>
                </tr>
                <tr>
                    <td>test placeholder</td>
                </tr>
                <tr>
                    <td>test placeholder</td>
                </tr>
                <tr>
                    <td>test placeholder</td>
                </tr>
                <tr>
                    <td>test placeholder</td>
                </tr>

            </table>
            <NavLink to="/mainMenu"><button type="button" class="small-button-right">Done</button></NavLink>

        </div>
    </body>
  );
}

export default ViewRefund;