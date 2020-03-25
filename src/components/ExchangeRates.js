import React, { Component } from 'react';
import axios from 'axios';

class ExchangeRates extends Component {
  constructor(props){
    super(props);
    //this is where the username and password is stored for the backend
    this.state = {
      eCode: '',
      eRate: 0.0,
      eName: '',
      visible: true,
      mainMenu: true,
      insert: false,
      update: false,
      delete: false
    };
  }

  //these handle requests allow the change of renders on the same component
  handleInsert = () => {
    this.setState({insert: true, mainMenu: false})
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
                ref = { inputCode => this.code = inputCode}/>
            </label>
            <br/>
            <label> Exchange Rate:
              <input
                type="number"
                name="value"
                id ="value"
                step ="0.01"
                ref = {invalue => this.rate = invalue}/>
            </label>
            <br/>
            <label> Country Name:
              <input
                type="text"
                name="country"
                id ="country"
                ref = {incountry => this.name = incountry}/>
            </label>
            <br/>
            <input type="submit" value="Enter" onClick={this.handleClick.bind(this)}/>
          </form>
      </div>
    )
  }

  handleUpdate = () => {
    this.setState({update: true, mainMenu: false})
  }

  handleDelete = () => {
    this.setState({delete: true, mainMenu: false})
  }

  handleMainMenu = () => {
    this.setState({insert: false, update: false, delete: false, mainMenu: true})
  }

  //this click event will do a post request for the server
  handleClick(e) {
    e.preventDefault();
    if(this.state.insert){
      axios.post('http://localhost:5000/addExchangeRate', {
          eCode: this.code.value,
          eRate: this.rate.value,
          eName: this.name.value
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
    } else if(this.state.update){
      axios.post('http://localhost:5000/updateExchangeRate', {
          eCode: this.code.value,
          eRate: this.rate.value,
          eName: this.name.value
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
    } else if(this.state.delete){
      axios.post('http://localhost:5000/removeExchangeRate', {
          eCode: this.code.value
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
    this.code.value = '';
    this.rate.value = 0.0;
    this.name.value = '';
  }

  render() {
    if(this.state.mainMenu) {
        return (
        <div>
          <h1> Exchange Rates </h1>
          <button onClick={this.handleUpdate}>Update an existing Exchange Rate</button>
          <br/> <br/>
          <button onClick={this.handleInsert}>Insert an Exchange Rate</button>
          <br/> <br/>
          <button onClick={this.handleDelete}>Delete an existing Exchange Rate</button>
        </div>)
     } else if(this.state.insert){
       return (
         <div>
           <h1>Insert Exchange Rates</h1>
             <form>
               <label> Exchange Rate Code:
                 <input
                   type="text"
                   name="exchangeCode"
                   id ="exchangeCode"
                   maxLength="3"
                   ref = { inputCode => this.code = inputCode}/>
               </label>
               <br/>
               <label> Exchange Rate:
                 <input
                   type="number"
                   name="value"
                   id ="value"
                   step ="0.01"
                   ref = {invalue => this.rate = invalue}/>
               </label>
               <br/>
               <label> Country Name:
                 <input
                   type="text"
                   name="country"
                   id ="country"
                   ref = {incountry => this.name = incountry}/>
               </label>
               <br/>
               <input type="submit" value="Enter" onClick={this.handleClick.bind(this)}/>
             </form>
           <button onClick={this.handleMainMenu}>Return to Main Menu</button>
         </div>
       )
     } else if(this.state.update){
       return (
         <div>
           <h1>Update Exchange Rates</h1>
             <form>
               <label> Exchange Rate Code:
                 <input
                   type="text"
                   name="exchangeCode"
                   id ="exchangeCode"
                   maxLength="3"
                   ref = { inputCode => this.code = inputCode}/>
               </label>
               <br/>
               <label> Exchange Rate:
                 <input
                   type="number"
                   name="value"
                   id ="value"
                   step ="0.01"
                   ref = {invalue => this.rate = invalue}/>
               </label>
               <br/>
               <label> Country Name:
                 <input
                   type="text"
                   name="country"
                   id ="country"
                   ref = {incountry => this.name = incountry}/>
               </label>
               <br/>
               <input type="submit" value="Update" onClick={this.handleClick.bind(this)}/>
             </form>
           <button onClick={this.handleMainMenu}>Return to Main Menu</button>
         </div>
       )
     } else if(this.state.delete){
       return (
         <div>
           <h1>Delete Exchange Rates</h1>
             <form>
               <label> Exchange Rate Code:
                 <input
                   type="text"
                   name="exchangeCode"
                   id ="exchangeCode"
                   maxLength="3"
                   ref = { inputCode => this.code = inputCode}/>
               </label>
               <label ref = {inR => this.rate = inR}></label>
               <label ref = {inC => this.name = inC}></label>
               <br/>
               <input type="submit" value="Delete" onClick={this.handleClick.bind(this)}/>
             </form>
           <button onClick={this.handleMainMenu}>Return to Main Menu</button>

         </div>
       )
     }
   }
 }

  //display the front end for us
const style = {margin: 15};
export default ExchangeRates;
