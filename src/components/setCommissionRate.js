import React, { useState } from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';

function SetCommissionRate(props) {
  const [commissionRate,setCommissionRate] = useState("");

  const handleSubmit = () => {
    console.log(commissionRate);
  }

  return (
    <body>
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

        <div id="mainmenu">
            <button type="button" class="page-button">Set Commission Rate</button>
        </div>

        <div id="menubox">
            <ul>
                <li><label>Commission Rate:</label></li>
                <li><textarea value={commissionRate} required onChange={(e) => setCommissionRate(e.target.value)}></textarea></li>
            </ul>

            <NavLink to="/setCommissionRate"><button type="button" class="small-button-right" onClick={handleSubmit}>Save</button></NavLink>
            <NavLink to="/mainMenu"><button type="button" class="small-button-right">Cancel</button></NavLink>
        </div>
    </body>
  );
}

export default SetCommissionRate;