import React from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';

function RateNavigator(props) {
  return (
    <body>
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

        <div id="mainmenu">
            <button type="button" class="page-button">Set Rate Navigator</button>
        </div>
        <div id="menubox">

            <ul>
                <li><NavLink to="/setCommissionRate"><button type="button" class="menu-button">Commission</button></NavLink></li>
                <li><NavLink to="/setExchangeRate"><button type="button" class="menu-button">Exchange</button></NavLink></li>
            </ul>
        </div>
        <NavLink to="/mainMenu"><button type="button" class="small-button-right">Cancel</button></NavLink>
    </body>
  );
}

export default RateNavigator;