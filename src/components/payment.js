import React from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';

function Payment(props) {
  return (
    <body>
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

        <div id="mainmenu">
            <button type="button" class="page-button">Payment</button>
        </div>
        <div id="menubox">
            <ul>
                <li><label>Amount to Pay:</label></li>
                <li><h2>£{props.paymentAmount}</h2></li>
            </ul>

        </div>
        <button type="button" class="menu-button">Pay Later</button>
        <button type="button" class="menu-button">Pay Cash</button>
        <NavLink to="/cardPayment"><button type="button" class="menu-button">Pay Card</button></NavLink>
        <NavLink to="/mainMenu"><button type="button" class="menu-button">Cancel</button></NavLink>
    </body>
  );
}

export default Payment;