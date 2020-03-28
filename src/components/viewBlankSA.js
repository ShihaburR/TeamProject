import React, {Component, useState} from 'react';
import axios from 'axios';
import Header from './header';
import { NavLink } from 'react-router-dom';

function ViewBlankSA(props) {
  const [addblank , setBlankMenu] = useState(false);
  const [removeblanks , setRemoveMenu] = useState(false);
  const [addbulk , setBulkMenu] = useState(false);
  const [mainMenu, setMainMenu] = useState(true);
  const [date, setDate] = useState("");
  const [bType, setType] = useState(0);
  const [bNumber, setNumber] = useState(0);
  const [bMin, setMin] = useState(0);
  const [bMax, setMax] = useState(0);

  //menu's navigation
  const showBlankMenu = () => {
      setBlankMenu(true);
      setRemoveMenu(false);
      setBulkMenu(false);
      setMainMenu(false);
  }

  const showBulkMenu = () => {
      setBulkMenu(true);
      setBlankMenu(false);
      setRemoveMenu(false);
      setMainMenu(false);
  }

  const showRemoveMenu = () => {
      setRemoveMenu(true);
      setBlankMenu(false);
      setBulkMenu(false);
      setMainMenu(false);
  }

  const showMainMenu = () => {
      setMainMenu(true);
      setBlankMenu(false);
      setBulkMenu(false);
      setRemoveMenu(false);
  }

  const addBlank = () => {
    console.log(date);
    axios.post('http://localhost:5000/addBlank', {
        bDate : date,
        bType : bType,
        bNumber : bNumber
    })
      .then(response => {
        if(response.status === 200){
          alert("Blank successfully added");
        }
      })
      .catch(function(error) {
        console.log(error);
        if(error.response.status === 401){
          alert("You are trying to add a blank that already exists. " +
                "Please enter a different blank number");
        }
      });
  }

  const addBulk = () => {
    axios.post('http://localhost:5000/addBulk', {
        bDate : date,
        bType : bType,
        bMin : bMin,
        bMax : bMax
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


  if(mainMenu) {
    return (
      <body class="indexbody">

      <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

      <div id="mainmenu">

          <button type="button" class="page-button">View Blank Stock</button>

      </div>

      <div id="tablecontainerrefund">
          <table align="center">
              <tr>
                  <th>List of Blanks</th>
              </tr>
              <tr>
                  <td>test placeholder</td>
              </tr>
              <tr>
                  <td>test placeholder</td>
              </tr>
              <tr>
                  <td>test placeholder</td>
              </tr>
              <tr>
                  <td>test placeholder</td>
              </tr>

          </table>
          <button type="button" class="small-button" onClick= {showBlankMenu}>Add a Blank</button>
          <button type="button" class="small-button" onClick = {showBulkMenu}>Add bulk of Blanks</button>
          <button type="button" class="small-button" onclick = {showRemoveMenu}>Remove Unused</button>
          <NavLink to="/mainMenu"><button type="button" class="small-button-right">Done</button></NavLink>
      </div>
      </body>
    );
  } else if(addblank){
      return(
        <body>
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
        <div id="menubox">
          <ul>
            <h2>Add blank</h2>
            <li>
              <label>Date:</label>
              <input type="date" value={date} required onChange={(e) => setDate(e.target.value)}/>
            </li>
            <li>
              <label>Blank Type:</label>
              <select value = {bType} required onChange={(e) => setType(e.target.value)}>
                <option value = "0">Select one</option>
                <option value = "444">444</option>
                <option value = "440">440</option>
                <option value = "420">420</option>
                <option value = "201">201</option>
                <option value = "101">101</option>
              </select>
            </li>
            <li>
              <label>Blank Number:</label>
              <input type="text" pattern="{6,}"  value={bNumber} required onChange={(e) => setNumber(e.target.value)}/>
              <br/>
              <button type="button" class="small-button" onClick={addBlank}>Add</button>
              <button type="button" class="small-button" onClick={showMainMenu}>Cancel</button>
            </li>
          </ul>
        </div>
        </body>
      );
  } else if(addbulk){
     return (
       <body>
       <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
       <div id="menubox">
         <ul>
           <h2>Add a Bulk of Blanks</h2>
           <li>
             <label>Date:</label>
             <input type="date" value={date} required onChange={(e) => setDate(e.target.value)}/>
           </li>
           <li>
             <label>Blank Type:</label>
             <select value = {bType} required onChange={(e) => setType(e.target.value)}>
               <option value = "0">Select one</option>
               <option value = "444">444</option>
               <option value = "440">440</option>
               <option value = "420">420</option>
               <option value = "201">201</option>
               <option value = "101">101</option>
             </select>
           </li>
           <li>
             <label>Minimum Range:</label>
             <input type="number" value={bMin} required onChange={(e) => setMin(e.target.value)}/>
           </li>
           <li>
             <label>Maximum Range:</label>
             <input type="number" value={bMax} required onChange={(e) => setMax(e.target.value)}/>
               <br/>
               <button type="button" class="small-button" onClick={addBulk}>Add</button>
               <button type="button" class="small-button" onClick={showMainMenu}>Cancel</button>
           </li>
         </ul>
       </div>
       </body>
     )
  } else if(removeblanks){

  }
}

export default ViewBlankSA;
