import React from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';

function RefundPayment(props) {
  return (
    <body>
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

        <div id="mainmenu">
            <button type="button" class="page-button">Refund Payment</button>
        </div>
        <div id="menubox">

            <ul>
                <li><button type="button" class="menu-button">Cash</button></li>
                <li><button type="button" class="menu-button">Card</button></li>
            </ul>

        </div>
        <NavLink to="/mainMenu"><button type="button" class="menu-button">Cancel</button></NavLink>
    </body>
  );
}

export default RefundPayment;