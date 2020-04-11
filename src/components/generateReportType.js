import React from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';

function GenerateReportType(props) {
  return (
    <body>
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

        <div id="mainmenu">
            <button type="button" class="page-button">Generate Report: Type</button>
        </div>
        <div id="menubox">

            <ul>
                <li><NavLink to="/individualReport"><button type="button" class="menu-button">Domestic</button></NavLink></li>
                <li><NavLink to="/advisorReport"><button type="button" class="menu-button">Interline</button></NavLink></li>
            </ul>

        </div>
        <NavLink to="/mainMenu"><button type="button" class="menu-button">Cancel</button></NavLink>
    </body>
  );
}

export default GenerateReportType;
