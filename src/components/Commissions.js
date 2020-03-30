import React, { useState } from 'react';
import axios from 'axios';
import Header from "./header";
import {NavLink} from 'react-router-dom';

function Commissions(props) {
  // Creating states and setter methods
  const [salesID, setSalesID] = useState('');
  const [cRate, setCRate] = useState(0.0);

  //this click event will do a post request for the server
  const handleClick = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/commissions', {
        salesID: salesID,
        cRate: cRate
    })
      .then(response => {
        console.log(response);
        //if the login was successful it will return a 200 code which means OK
        if (response.status === 200) {
          alert("Update Successful, rate has changed");
        }
      })
      .catch(function(error) {
        console.log(error);
        if(error.response.status === 404){
            alert("The Sales ID given does not exist in the database." +
            " Please enter a valid Sales ID");
        } else {alert("Error please try again");}
    });
    this.ID.value = '';
    this.rate.value = '';
  }

  //display the front end for us
  return (
      <body class="indexbody">
        <div>
          <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
          <h1 align="center">Change Commission Rates</h1>
        </div>
        <div id="menubox" align="center" class="mainSize">
          <ul>
          <br/>
            <li>
              <label> Sales ID:
                <input
                  type="number"
                  name="salesID"
                  id ="salesID"
                  value={salesID} required onChange={(e) => setSalesID(e.target.value)}/>
              </label>
            </li>
            <li>
              <label> Commission Rate:
                <input
                  type="double"
                  name="commission"
                  id ="commission"
                  value={cRate} required onChange={(e) => setCRate(e.target.valueAsNumber)}/>
              </label>
            </li>
            <button type ="button" class="small-button"
            onClick={handleClick.bind(this)}>Submit</button>
            <NavLink to="/mainMenu"><button type="button" class="small-button">Cancel</button></NavLink>
          </ul>
        </div>
      </body>
  )
}

export default Commissions;
