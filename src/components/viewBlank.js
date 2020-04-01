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
  const [bulkassign, setBulkAssign] = useState(false);
  const [main, setMain] = useState(true);

  const showMainMenu = () => {
    setMain(true);
    setAssign(false);
    setReAssign(false);
    setBulkAssign(false);
  }

  const showAssignMenu = () => {
    setAssign(true);
    setMain(false);
    setReAssign(false);
    setBulkAssign(false);
  }

  const showReAssignMenu = () => {
    setReAssign(true);
    setAssign(false);
    setMain(false);
    setBulkAssign(false);
  }

  const showBulkMenu = () => {
    setBulkAssign(true);
    setReAssign(false);
    setAssign(false);
    setMain(false);
  }

  //assign blank
  const [id, setID] = useState('');
  const [num, setNum] = useState('');
  const [newID, setNewID] = useState('');
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [type, setType] = useState(0);

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

  const assignBulk = () => {
    axios.post('http://localhost:5000/assignBulk', {
        id: id,
        type: type,
        min : min,
        max : max
    })
      .then(response => {
        if(response.status === 200){
          alert("Blanks successfully added");
        }
      })
      .catch(function(error) {
        console.log(error);
        if(error.response.status === 401){
          alert("The range adds a blank that already exists. " +
                "Please enter a different range");
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
        <div align="center">
          <button align="center" type="button" class="small-button" onClick={showAssignMenu}>Assign</button>
          <button align="center" type="button" class="small-button" onClick={showBulkMenu}>Bulk-assign</button>
          <button align="center" type="button" class="small-button" onClick={showReAssignMenu}>Re-assign</button>
          <NavLink to="/mainMenu"><button type="button" class="small-button-right">Done</button></NavLink>
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
            <table style={{width : "24%", display : "inline-block"}} className="striped responsive-table">
              <thead>
                <tr>
                  <th>Blank Number</th>
                  <th>Assigned Date</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(blanksData) && blanksData.length > 0 && blanksData.map(r => (
                <tr key={r.blankNumber} id={r.blankNumber}>
                  <td>{r.blankNumber}</td>
                  <td>{displayDate(r.assignedDate)}</td>
                </tr>
                ))}
              </tbody>
            </table>
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
  } else if(bulkassign){
    return (
      <body>
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
        <div id="menubox">
        <h2 align="center">Assign Blanks in Bulk</h2>
          <ul>
            <li>
              <label>Advisor ID:</label>
              <input type="number" value={id} required onChange={(e) => setID(e.target.value)}/>
            </li>
            <li>
              <label>Blank Type:</label>
              <select value = {type} required onChange={(e) => setType(e.target.value)}>
                <option value = "0">Select one</option>
                <option value = "444">444</option>
                <option value = "440">440</option>
                <option value = "420">420</option>
                <option value = "201">201</option>
                <option value = "101">101</option>
              </select>
            </li>
            <li>
              <label>Blank Min Number:</label>
              <input type="number" pattern="{6,}"  value={min} required onChange={(e) => setMin(e.target.value)}/>
            </li>
            <li>
              <label>Blank Max Number:</label>
              <input type="number" pattern="{6,}"  value={max} required onChange={(e) => setMax(e.target.value)}/>
              <br/>
              <button type="button" class="small-button" onClick={assignBulk}>Add</button>
              <button type="button" class="small-button" onClick={() => {showMainMenu(); getBlanks(); getAdvisors(); getAssigns();}}>Cancel</button>
            </li>
          </ul>
        </div>
      </body>
    )
  }
}

export default ViewBlank;
