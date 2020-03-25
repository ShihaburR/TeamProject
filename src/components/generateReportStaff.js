import React from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';

function GenerateReportStaff(props) {

    const handleClick = () => {
        console.log("This works!!");
    }

  return (
    <body>
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

        <div id="mainmenu">
            <button type="button" class="page-button">Generate Report: Staff</button>
        </div>

        <div id="menubox">
            <table align="center">
                <tr>
                    <th>View Staff</th>
                </tr>
                <tr onClick={handleClick}>
                    <td>test placeholder</td>
                </tr>
            </table>
        </div>

        <NavLink to="/generateReportType"><button type="button" class="menu-button">OK</button></NavLink>
        <NavLink to="/mainMenu"><button type="button" class="menu-button">Cancel</button></NavLink>
    </body>
  );
}

export default GenerateReportStaff;