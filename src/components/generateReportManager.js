import React from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';

function GenerateReportManager(props) {
  return (
    <body>
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

        <div id="mainmenu">
            <button type="button" class="page-button">Generate Report</button>
        </div>
        <div id="menubox">

            <ul>
                <li><NavLink to="/generateReportManager"><button type="button" class="menu-button">Stock Turnover</button></NavLink></li>
                <li><NavLink to="/generateReportManager"><button type="button" class="menu-button">Global Sales</button></NavLink></li>
                <li><NavLink to="/generateReportStaff"><button type="button" class="menu-button">Individual</button></NavLink></li>
            </ul>
        </div>
        <NavLink to="/mainMenu"><button type="button" class="menu-button">Cancel</button></NavLink>
    </body>
  );
}

export default GenerateReportManager;