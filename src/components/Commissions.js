import React, { Component } from 'react';
import axios from 'axios';
import styles from './default.css';

class Commissions extends Component {
  constructor(props){
    super(props);
    //this is where the username and password is stored for the backend
    this.state = {salesID: '', cRate: 0.0};
  }

  //this click event will do a post request for the server
  handleClick(e) {
    e.preventDefault();
    axios.post('http://localhost:5000/commissions', {
        salesID: this.ID.value,
        cRate: this.rate.value
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
  render(){
    return (
      <div class = "indexbody">
        <h1>Change Commission Rates</h1>
          <form class = "mainmenu">
            <label> Sales ID:
              <input
                type="number"
                name="salesID"
                id ="salesID"
                ref = { inputid => this.ID = inputid}/>
            </label>
            <br/>
            <label> Commission Rate:
              <input
                type="double"
                name="commission"
                id ="commission"
                ref = {inrate => this.rate = inrate}/>
            </label>
            <br/> <br/>
            <button type ="button" class="page-button"
            onClick={this.handleClick.bind(this)}>Submit</button>
          </form>
      </div>
    )
  }
}
export default Commissions;
