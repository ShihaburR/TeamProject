import React, { useState } from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';

function GenerateReportPeriod(props) {
    const [beginning, setBeginning] = useState("");
    const [end, setEnd] = useState("");

    const handleSubmit = () => {
        console.log(beginning + " " + end);
    }

  return (
    <body>
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

        <div id="mainmenu">
            <button type="button" class="page-button">Generate Report: Period</button>
        </div>

        <div id="menubox">

            <ul>
                <li><h2>Report Period:</h2></li>
                <li><label>Beginning:</label></li>
                <li><textarea value={beginning} required onChange={(e) => setBeginning(e.target.value)}></textarea></li>
            </ul>

            <ul>
                <li></li>
                <li><label>End:</label></li>
                <li><textarea value={end} required onChange={(e) => setEnd(e.target.value)}></textarea></li>
            </ul>

        </div>
        <NavLink to="/mainMenu"><button type="button" class="menu-button" onClick={handleSubmit}>OK</button></NavLink>
        <NavLink to="/mainMenu"><button type="button" class="menu-button">Cancel</button></NavLink>
    </body>
  );
}

export default GenerateReportPeriod;