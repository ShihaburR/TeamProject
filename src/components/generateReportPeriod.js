import React, { useState } from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';


function GenerateReportPeriod(props) {
    const [beginning, setBeginning] = useState("");
    const [end, setEnd] = useState("");

    const handleSubmit = () => {
        console.log(beginning + " " + end);
        props.getData(beginning, end);
        props.setPeriod(true);
    }

    const buttonToDisplay = () => {
        switch (props.location.pathname) {
            case "/advisorReport":
                return (
                    <button type="button" class="menu-button" disabled={(!beginning || !end)} onClick={handleSubmit}>OK</button>
                );
            case "/domesticReport":
                return (
                    <button type="button" class="menu-button" disabled={(!beginning || !end)} onClick={handleSubmit}>OK</button>
                );
            case "/individualReport":
                return (
                    <button type="button" class="menu-button" disabled={(!beginning || !end)} onClick={handleSubmit}>OK</button>
                );
            case "/interlineReport":
                return (
                    <button type="button" class="menu-button" disabled={(!beginning || !end)} onClick={handleSubmit}>OK</button>
                );
            case "/stockTurnOverReport":
                return (
                    <button type="button" class="menu-button" disabled={(!beginning || !end)} onClick={handleSubmit}>OK</button>
                );
        }
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
                <li><input type="date" value={beginning} max={end} required onChange={(e) => setBeginning(e.target.value)}></input></li>
            </ul>

            <ul>
                <li></li>
                <li><label>End:</label></li>
                <li><input type="date" value={end} min={beginning} required onChange={(e) => setEnd(e.target.value)}></input></li>
            </ul>

        </div>
        {buttonToDisplay()}
        <NavLink to="/mainMenu"><button type="button" class="menu-button">Cancel</button></NavLink>
    </body>
  );
}

export default GenerateReportPeriod;