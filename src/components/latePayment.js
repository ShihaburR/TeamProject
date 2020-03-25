import React, { useState } from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';

function LatePayment(props) {
    const [customerID, setCustomerID] = useState("");
    const [blankID, setBlankID] = useState("");

    const handleSubmit = () => {
        console.log(customerID + " " + blankID);
    }

  return (
    <body>
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

        <div id="mainmenu">
            <button type="button" class="page-button">Late Payment</button>
        </div>

        <div id="menubox">
            <ul>
                <li><label>Customer ID:</label></li>
                <li><textarea value={customerID} required onChange={(e) => setCustomerID(e.target.value)}></textarea></li>
            </ul>

            <ul>
                <li><label>Blank ID:</label></li>
                <li><textarea value={blankID} required onChange={(e) => setBlankID(e.target.value)}></textarea></li>
            </ul>

        </div>
        <NavLink to="/payment"><button type="button" class="menu-button" onClick={handleSubmit}>OK</button></NavLink>
        <NavLink to="/mainMenu"><button type="button" class="menu-button">Cancel</button></NavLink>
    </body>
  );
}

export default LatePayment;