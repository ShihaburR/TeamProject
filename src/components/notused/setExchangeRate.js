import React, { useState } from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';

function SetExchangeRate(props) {
  const [exchangeRate,setExchangeRate] = useState("");

  const handleSubmit = () => {
    console.log(exchangeRate);
  }

  return (
    <body>
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

        <div id="mainmenu">
            <button type="button" class="page-button">Set Exchange Rate</button>
        </div>

        <div id="menubox">
            <ul>
                <li><label>Exchange Rate:</label></li>
                <li><textarea value={exchangeRate} required onChange={(e) => setExchangeRate(e.target.value)}></textarea></li>
            </ul>

        </div>
        <NavLink to="/setExchangeRate"><button type="button" class="small-button-right" onClick={handleSubmit}>Save</button></NavLink>
        <NavLink to="/mainMenu"><button type="button" class="small-button-right">Cancel</button></NavLink>
    </body>
  );
}

export default SetExchangeRate;