import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';
import Header from './header';
import { NavLink } from 'react-router-dom';
import searchIcon from './search-icon.png';

function ViewBlankSA(props) {
  const [addblank , setBlankMenu] = useState(false);
  const [addbulk , setBulkMenu] = useState(false);
  const [mainMenu, setMainMenu] = useState(true);
  const [date, setDate] = useState("");
  const [bType, setType] = useState(0);
  const [bNumber, setNumber] = useState(0);
  const [bMin, setMin] = useState(0);
  const [bMax, setMax] = useState(0);
  const [blanksData, setData] = useState("");
  const [search, setSearch] = useState("");

  //on startup will load blanks into table
  useEffect(() => {
    getBlanks();
  }, []);

  //menu's navigation
  const showBlankMenu = () => {
      setBlankMenu(true);
      setBulkMenu(false);
      setMainMenu(false);
  }
  const showBulkMenu = () => {
      setBulkMenu(true);
      setBlankMenu(false);
      setMainMenu(false);
  }
  const showMainMenu = () => {
      setMainMenu(true);
      setBlankMenu(false);
      setBulkMenu(false);
  }

  //functions that access the database
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

  const removeBlank = (number) => {
    axios.post('http://localhost:5000/removeBlank', {
      bNumber : number
    })
    .then(response => {
      if(response.status === 200){
        alert("Blank deleted");
        getBlanks();
      }
    })
    .catch(function(error) {
      console.log(error)
      if(error.response.status === 401){
        alert("Error, you are trying to delete a blank that is assigned to an advisor" +
      " Please delete a different blank or contact the office manager");
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

  const filter = () => {
    axios.post('http://localhost:5000/searchBlanks', {
      num : search
    })
    .then(response => {
      console.log(response.data);
      setData(response.data);
      console.log(blanksData);
    })
    .catch(error => {
      console.log(error);
    });
  }

  if(mainMenu) {
    return (
      <body class="indexbody">
      <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
      <div id="mainmenu">
        <button type="button" class="page-button">Blank Stocks</button>
        <br/> <br/>
        <input type="text" value={search} placeholder= "Enter a blank number..." class="search_bar"
        placeholder="Enter a blank number"required onChange={(e) => setSearch(e.target.value)}/>
        <button type="button" class="search_submit" onClick={() => {filter();}}>
          <img src={searchIcon} alt="Search"  height="17.5" width="16"/>
        </button>
        <br/><br/>
        <button type="button" class="menu-button" onClick= {showBlankMenu}>Add a Blank</button>
        <button type="button" class="menu-button" onClick = {showBulkMenu}>Add bulk of Blanks</button>
        <NavLink to="/mainMenu"><button type="button" class="menu-button">Done</button></NavLink>
      </div>
      <div id="tablecontainerrefund">
        <table className="striped responsive-table">
          <thead>
            <tr>
              <th>Blank Number</th>
              <th>Recieved Date</th>
              <th>Blank Type</th>
              <th>Blank Assigned?</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(blanksData) && blanksData.length > 0 && blanksData.map(r => (
            <tr key={r.blankNumber} id={r.blankNumber}>
              <td align="center">{r.blankNumber}</td>
              <td align="center">{(r.recievedDate.toString()).slice(0,10)}</td>
              <td align="center">{(r.blankNumber.toString()).slice(0,3)}</td>
              <td align="center">{displayDate(r.assignedDate)}</td>
              <td align="center"><button type="button" value={r.blankNumber}
               onClick ={() => {removeBlank(r.blankNumber)}}>Delete</button></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div align="center">
        <br/>
        <button type="button" class="menu-button" onClick={getBlanks}>Reload Table</button>
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
                <option value = "452">452</option>
                <option value = "451">451</option>
                <option value = "444">444</option>
                <option value = "440">440</option>
                <option value = "420">420</option>
                <option value = "201">201</option>
                <option value = "101">101</option>
              </select>
            </li>
            <li>
              <label>Blank Last Digits:</label>
              <input type="string"  maxLength="3"  value={bNumber} required onChange={(e) => setNumber(e.target.value)}/>
              <br/>
              <button type="button" class="small-button" onClick={addBlank}>Add</button>
              <button type="button" class="small-button" onClick={() => {showMainMenu(); getBlanks()}}>Cancel</button>
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
               <option value = "452">452</option>
               <option value = "451">451</option>
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
               <button type="button" class="small-button" onClick={() => {showMainMenu(); getBlanks()}}>Cancel</button>
           </li>
         </ul>
       </div>
       </body>
     )
  }
}

export default ViewBlankSA;
