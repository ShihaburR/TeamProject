import React, {Component, useState} from 'react';
import axios from 'axios';
import Header from "./header";

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
    return (
      <div>
        <h1>Change Exchange Rates</h1>
          <form>
            <label> Exchange Rate Code:
              <input
                type="text"
                name="exchangeCode"
                id ="exchangeCode"
                maxLength="3"
                value={eCode}
                required onChange={(e) => setECode(e.target.value)}/>
            </label>
            <br/>
            <label> Exchange Rate:
              <input
                type="number"
                name="value"
                id ="value"
                step ="0.01"
                value={eRate}
                required onChange={(e) => setERate(e.target.valueAsNumber)}/>
            </label>
            <br/>
            <label> Country Name:
              <input
                type="text"
                name="country"
                id ="country"
                value={eName}
                required onChange={(e) => setEName(e.target.value)}/>
            </label>
            <br/>
            <input type="submit" value="Enter" onClick={handleClick.bind(this)}/>
          </form>
      </div>
    )
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
      <div>
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
        <h1> Exchange Rates </h1>
        <button onClick={handleUpdate}>Update an existing Exchange Rate</button>
        <br/> <br/>
        <button onClick={handleInsert}>Insert an Exchange Rate</button>
        <br/> <br/>
        <button onClick={handleDelete}>Delete an existing Exchange Rate</button>
      </div>)
   } else if(insert){
     return (
       <div>
         <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
         <h1>Insert Exchange Rates</h1>
           <form>
             <label> Exchange Rate Code:
               <input
                 type="text"
                 name="exchangeCode"
                 id ="exchangeCode"
                 maxLength="3"
                 value={eCode}
                 required onChange={(e) => setECode(e.target.value)}/>
             </label>
             <br/>
             <label> Exchange Rate:
               <input
                 type="number"
                 name="value"
                 id ="value"
                 step ="0.01"
                 value={eRate}
                 required onChange={(e) => setERate(e.target.valueAsNumber)}/>
             </label>
             <br/>
             <label> Country Name:
               <input
                 type="text"
                 name="country"
                 id ="country"
                 value={eName}
                 required onChange={(e) => setEName(e.target.value)}/>
             </label>
             <br/>
             <input type="submit" value="Enter" onClick={handleClick.bind(this)}/>
           </form>
         <button onClick={handleMainMenu}>Return to Main Menu</button>
       </div>
     )
   } else if(update){
     return (
       <div>
         <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
         <h1>Update Exchange Rates</h1>
           <form>
             <label> Exchange Rate Code:
               <input
                 type="text"
                 name="exchangeCode"
                 id ="exchangeCode"
                 maxLength="3"
                 value={eCode}
                 required onChange={(e) => setECode(e.target.value)}/>
             </label>
             <br/>
             <label> Exchange Rate:
               <input
                 type="number"
                 name="value"
                 id ="value"
                 step ="0.01"
                 value={eRate}
                 required onChange={(e) => setERate(e.target.valueAsNumber)}/>
             </label>
             <br/>
             <label> Country Name:
               <input
                 type="text"
                 name="country"
                 id ="country"
                 value={eName}
                 required onChange={(e) => setEName(e.target.value)}/>
             </label>
             <br/>
             <input type="submit" value="Update" onClick={handleClick.bind(this)}/>
           </form>
         <button onClick={handleMainMenu}>Return to Main Menu</button>
       </div>
     )
   } else if(dlt){
     return (
       <div>
         <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
         <h1>Delete Exchange Rates</h1>
           <form>
             <label> Exchange Rate Code:
               <input
                 type="text"
                 name="exchangeCode"
                 id ="exchangeCode"
                 maxLength="3"
                 value={eCode} required onChange={(e) => setECode(e.target.value)}/>
             </label>
             <label value={eRate} required onChange={(e) => setERate(e.target.valueAsNumber)}></label>
             <label value={eName} required onChange={(e) => setEName(e.target.value)}></label>
             <br/>
             <input type="submit" value="Delete" onClick={handleClick.bind(this)}/>
           </form>
         <button onClick={handleMainMenu}>Return to Main Menu</button>
       </div>
     )
   }
 }

  //display the front end for us
const style = {margin: 15};
export default ExchangeRates;
