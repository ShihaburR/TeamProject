import React, {Component, useState} from 'react';
import axios from 'axios';
import Header from "./header";
import {NavLink} from "react-router-dom";


function ExchangeRates(props) {
  const [eCode, setECode] = useState('');
  const [eRate, setERate] = useState(0.0);
  const [eName, setEName] = useState('');
  const [visible, setVisible] = useState(true);
  const [mainMenu, setMainMenu] = useState(true);
  const [insert, setInsert] = useState(false);
  const [update, setUpdate] = useState(false);
  const [dlt, setDlt] = useState(false);


  //these handle requests allow the change of renders on the same component
  const handleInsert = () => {
    setInsert(true);
    setMainMenu(false);
  }

  const handleUpdate = () => {
    setUpdate(true);
    setMainMenu(false);
  }

  const handleDelete = () => {
    setDlt(true);
    setMainMenu(false);
  }

  const handleMainMenu = () => {
    setInsert(false);
    setUpdate(false);
    setDlt(false);
    setMainMenu(true);
  }

  //this click event will do a post request for the server
  const handleClick = (e) => {
    e.preventDefault();
    if(insert){
      axios.post('http://localhost:5000/addExchangeRate', {
          eCode: eCode,
          eRate: eRate,
          eName: eName
      })
        .then(response => {
          console.log(response);
          if(response.status === 200){
            alert("Exchange Rate has been added to Database")
          }
        })
        .catch(function(error) {
          console.log(error);
          if(error.response.status === 401){
            alert("Exchange Code given already exists in database. " +
            "Either update or enter a different Exchange Code");
          } else {alert("Error please enter your details again");}
      });
    } else if(update){
      axios.post('http://localhost:5000/updateExchangeRate', {
          eCode: eCode,
          eRate: eRate,
          eName: eName
      })
        .then(response => {
          console.log(response);
          //if the login was successful it will return a 200 code which means OK
          if (response.status === 200) {
              alert("Exchange Code has been updated in the Database");
          }
        })
        .catch(function(error) {
          console.log(error);
          if(error.response.status === 401){
            alert("Exchange Code given does not exist");
          } else {
          alert("Error please enter your details again");
          }
      });
    } else if(dlt){
      axios.post('http://localhost:5000/removeExchangeRate', {
          eCode: eCode
      })
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            alert("ExchangeRate has been deleted");
          }
        })
        .catch(function(error) {
          console.log(error);
          if(error.response.status === 401){
            alert("You are trying to delete too many Exchange Rates. " +
            "Please add more exchange rates before deleting one");
          } else if(error.response.status === 404){
            alert("Exchange Rate you have provided does not exist, " +
            "Please enter a valid Exchange Rate Code");
          } else {
          alert("Error, please enter your details again");
        }
      });
    }
    setECode('');
    setERate(0.0);
    setEName('');
  }


  if(mainMenu) {
    return (
      <body class="indexbody">
        <div>
          <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
          <h1 align="center"> Exchange Rates </h1>
        </div>
        <div id="mainmenu">
          <div id="menubox">
            <br/><br/><br/><br/><br/>
            <button onClick={handleUpdate} class="menu-button">Update Exchange Rate</button>
            <button onClick={handleInsert} class="menu-button">Insert Exchange Rate</button>
            <button onClick={handleDelete} class="menu-button">Delete Exchange Rate</button>
            <br/><br/>
            <NavLink to="/mainMenu"><button type="button" class="menu-button">Cancel</button></NavLink>
          </div>
        </div>
      </body>
    )
   } else if(insert){
     return (
       <body class="indexbody">
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
        <h1 align="center">Insert Exchange Rates</h1>
        <div id="menubox" align="center" class="mainSize">
         <ul>
           <li>
             <label> Exchange Rate Code:
               <input
                 type="text"
                 name="exchangeCode"
                 id ="exchangeCode"
                 maxLength="3"
                 value={eCode}
                 required onChange={(e) => setECode(e.target.value)}/>
             </label>
           </li>
           <li>
             <label> Exchange Rate:
               <input
                 type="number"
                 name="value"
                 id ="value"
                 step ="0.01"
                 value={eRate}
                 required onChange={(e) => setERate(e.target.valueAsNumber)}/>
             </label>
           </li>
           <li>
             <label> Country Name:
               <input
                 type="text"
                 name="country"
                 id ="country"
                 value={eName}
                 required onChange={(e) => setEName(e.target.value)}/>
             </label>
           </li>
          <button type="submit" value="Enter" class= "small-button"
          onClick={handleClick.bind(this)}>Enter</button>
          <button class="small-button" onClick={handleMainMenu}>Go Back</button>
         </ul>
        </div>
       </body>
     )
   } else if(update){
     return (
       <body class="indexbody">
         <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
         <h1 align="center">Update Exchange Rates</h1>
         <div id="menubox" align="center" class="mainSize">
           <ul>
            <li>
               <label> Exchange Rate Code:
                 <input
                   type="text"
                   name="exchangeCode"
                   id ="exchangeCode"
                   maxLength="3"
                   value={eCode}
                   required onChange={(e) => setECode(e.target.value)}/>
               </label>
            </li>
            <li>
             <label> Exchange Rate:
               <input
                 type="number"
                 name="value"
                 id ="value"
                 step ="0.01"
                 value={eRate}
                 required onChange={(e) => setERate(e.target.valueAsNumber)}/>
             </label>
            </li>
            <li>
             <label> Country Name:
               <input
                 type="text"
                 name="country"
                 id ="country"
                 value={eName}
                 required onChange={(e) => setEName(e.target.value)}/>
             </label>
            </li>
            <button type="submit" value="Update" class="small-button"
            onClick={handleClick.bind(this)}>Update</button>
            <button class="small-button" onClick={handleMainMenu}>Go Back</button>
           </ul>
         </div>
       </body>
     )
   } else if(dlt){
     return (
       <body class="indexbody">
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
        <h1 align="center">Delete Exchange Rates</h1>
         <div id="menubox" align="center" class="mainSize">
           <ul>
           <br/><br/><br/><br/>
            <li>
              <label> Exchange Rate Code:
                <input
                   type="text"
                   name="exchangeCode"
                   id ="exchangeCode"
                   maxLength="3"
                   value={eCode} required onChange={(e) => setECode(e.target.value)}/>
              </label>
            </li>
            <li>
             <label value={eRate} required onChange={(e) => setERate(e.target.valueAsNumber)}></label>
             <label value={eName} required onChange={(e) => setEName(e.target.value)}></label>
            </li>
           </ul>
           <button type="submit" value="Delete" onClick={handleClick.bind(this)}
           class="small-button">Delete</button>
           <button class="small-button" onClick={handleMainMenu}>Go Back</button>
         </div>
       </body>
     )
   }
 }

  //display the front end for us
const style = {margin: 15};
export default ExchangeRates;
