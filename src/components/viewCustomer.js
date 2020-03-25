import React from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';

function ViewCustomer(props) {
  return (
    <body class="indexbody">

    <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

        <div id="mainmenu">

            <button type="button" class="page-button">View Customers</button>

        </div>

        <div id="tablecontainerrefund">
            <table align="center">
                <tr>
                    <th>View Customers</th>
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
            <button type="button" class="small-button">Edit Status</button>
            <NavLink to="/mainMenu"><button type="button" class="small-button-right" onclick="document.location = '../Menu/MainMenuManager.html'">Done</button></NavLink>
        </div>
    </body>
  );
}

export default ViewCustomer;