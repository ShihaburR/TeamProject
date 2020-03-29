import React, {Component, useState, useEffect} from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function ViewBlank(props) {
  const [blanksData, setData] = useState('');
  const [advisors, setAdvisors] = useState('');
  const [assignData, setAssignData] = useState('');
  const [assign, setAssign] = useState(false);
  const [reassign, setReAssign] = useState(false);
  const [main, setMain] = useState(true);

  const showMainMenu = () => {
    setMain(true);
    setAssign(false);
    setReAssign(false);
  }

  const showAssignMenu = () => {
    setAssign(true);
    setMain(false);
    setReAssign(false);
  }

  const showReAssignMenu = () => {
    setReAssign(true);
    setAssign(false);
    setMain(false);
  }

  //assign blank
  const [id, setID] = useState('');
  const [num, setNum] = useState('');
  const [newID, setNewID] = useState('');

  const getBlanks = () => {
    axios.get('http://localhost:5000/blanks')
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  const getAdvisors = () => {
    axios.get('http://localhost:5000/advisors')
      .then(response => {
        console.log(response.data);
        setAdvisors(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  const getAssigns = () => {
    axios.get('http://localhost:5000/assigns')
      .then(response => {
        console.log(response.data);
        setAssignData(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getBlanks();
    getAdvisors();
    getAssigns();
  }, []);

  const assignBlank = () => {
    axios.post('http://localhost:5000/assignBlank', {
        id : id,
        bNumber : num
    })
      .then(response => {
        if(response.status === 200){
          alert("Blank successfully assigned");
        }
      })
      .catch(function(error) {
        console.log(error);
        if(error.response.status === 401){
          alert("You are assign a blank that is already assigned. " +
                "Please enter a different blank number or ID");
        }
      });
  }

  const reassignBlank = () => {
    axios.post('http://localhost:5000/reAssignBlank', {
        id : id,
        num : num,
        newID : newID,
    })
      .then(response => {
        if(response.status === 200){
          alert("Blank successfully re-assigned");
        }
      })
      .catch(function(error) {
        console.log(error);
        if(error.response.status === 401){
          alert("You are trying to assign a blank that was not assigned or " +
          "assigned to another advisor, Please enter a different blank number or ID");
        }
      });
    }

  const displayDate = (date) => {
    if(date != null) {
      date = date.toString().slice(0,10);
      return (date);
    } else {
      return(date);
    }
  }

  if(main){
    return (
      <body class="indexbody">
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
        <div id="mainmenu">
            <button type="button" class="page-button">View Refund-Log</button>
        </div>
        <div id="mainmenu">
          <div id="tablecontainerrefund" style={{display : "inline-block"}}>
            <table style={{width : "60%",float: "left" }} className="striped responsive-table">
            <thead>
              <th>Advisor's ID</th>
              <th>Advisor's Names</th>
            </thead>
            <tbody>
            {Array.isArray(advisors) && advisors.length > 0 && advisors.map(r => (
            <tr key={r.staffID} id={r.staffID}>
              <td align="center">{r.staffID}</td>
              <td align="center">{r.name.toString() + " " + r.surname.toString()}</td>
            </tr>
            ))}
            </tbody>
            </table>
            <table style={{width : "60%",float: "left" }} className="striped responsive-table">
              <thead>
                <th>Blank Allocation ID</th>
                <th>Advisor's ID</th>
                <th>Advisor's Blank Number</th>
              </thead>
              <tbody>
              {Array.isArray(assignData) && assignData.length > 0 && assignData.map(r => (
              <tr key={r.staffID} id={r.staffID}>
                <td align="center">{r.blankAllocationId}</td>
                <td align="center">{r.staffID}</td>
                <td align="center">{r.blankNumber}</td>
              </tr>
              ))}
              </tbody>
            </table>
            <table style={{width : "35%", display : "inline-block"}} className="striped responsive-table">
              <thead>
                <tr>
                  <th>Blank Number</th>
                  <th>Blank Assigned?</th>
                  <th>Assigned Date</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(blanksData) && blanksData.length > 0 && blanksData.map(r => (
                <tr key={r.blankNumber} id={r.blankNumber}>
                  <td>{r.blankNumber}</td>
                  <td align="center">{r.isAssigned}</td>
                  <td>{displayDate(r.assignedDate)}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <button align="center" type="button" class="small-button" onClick={showAssignMenu}>Assign</button>
            <button align="center" type="button" class="small-button" onClick={showReAssignMenu}>Re-assign</button>
            <NavLink to="/mainMenu"><button type="button" class="small-button-right">Done</button></NavLink>
          </div>
        </div>
      </body>
    );
  } else if(assign) {
      return (
        <body>
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
        <div id="menubox">
          <ul>
            <h2>Assign Blank</h2>
            <li>
              <label>Advisor ID:</label>
              <input type="number" value={id} required onChange={(e) => setID(e.target.value)}/>
            </li>
            <li>
              <label>Blank Number:</label>
              <input type="text" pattern="{6,}"  value={num} required onChange={(e) => setNum(e.target.value)}/>
              <br/>
              <button type="button" class="small-button" onClick={assignBlank}>Add</button>
              <button type="button" class="small-button" onClick={() => {showMainMenu(); getBlanks(); getAdvisors(); getAssigns();}}>Cancel</button>
            </li>
          </ul>
        </div>
      </body>
    )
  } else if(reassign) {
    return (
      <body>
      <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
      <div id="menubox">
        <ul>
          <h2>Re-Assign a Blank</h2>
          <li>
            <label>Current Advisor ID:</label>
            <input type="number" value={id} required onChange={(e) => setID(e.target.value)}/>
          </li>
          <li>
            <label>New Advisor ID:</label>
            <input type="number" value={newID} required onChange={(e) => setNewID(e.target.value)}/>
          </li>
          <li>
            <label>Blank Number:</label>
            <input type="text" pattern="{6,}"  value={num} required onChange={(e) => setNum(e.target.value)}/>
            <br/>
            <button type="button" class="small-button" onClick={reassignBlank}>Re-assign</button>
            <button type="button" class="small-button" onClick={() => {showMainMenu(); getBlanks(); getAdvisors(); getAssigns();}}>Cancel</button>
          </li>
        </ul>
      </div>
    </body>
  )
  }
}

export default ViewBlank;
