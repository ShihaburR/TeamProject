import React, { useState, useEffect } from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Refund(props) {
    const [blankID, setBlankID] = useState("");
    const [bData, setData] = useState([]);

    const handleSubmit = () => {
        axios.post('http://localhost:5000/logRefund', {
          num : blankID
        })
        .then(response => {
            if(response.status === 200){
              alert("Ticket has been refunded and logged");
            }
        })
        .catch(error => {
          console.log(error);
          if(error.response.status === 401){
            alert("The Blank number given has a log file on its refund. " +
            "Please enter a different blank number or check its log file");
          }
        })
    }
    const getBlanks = () => {
      axios.get('http://localhost:5000/advisorBlanks')
        .then(response => {
          console.log(response.data);
          setData(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    useEffect(() => {
      getBlanks();
    }, []);

  return (
    <body class ="indexbody">
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
        <div id="mainmenu">
            <button type="button" class="page-button">Refund Ticket</button>
        </div>
        <div id="menubox" class="mainSize" align="center">
        <br/><br/><br/><br/>
        <label>Blank Number:
          <select value={blankID} onChange={(e) => setBlankID(e.target.value)}>
            <option value="0">"Select a Blank Number"</option>
            {bData.map(r => (
              <option key={r.blankNumber} value={r.blankNumber}>
              {r.blankNumber}
              </option>
            ))}
          </select>
        </label>
        <br/><br/>
        <button type="button" class="small-button" onClick={handleSubmit}>Add Refund</button>
        <NavLink to="/mainMenu"><button type="button" class="small-button">Cancel</button></NavLink>
        </div>
    </body>
  );
}

export default Refund;
