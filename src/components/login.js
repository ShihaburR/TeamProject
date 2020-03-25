import React, {Component} from 'react';
import axios from 'axios';
import Background from './loginBK.jpg';
//mainMenu imports
import setStaffInfo from '../App.js';
import ReactDOM from "react-dom";
import {Redirect} from "react-router-dom";
import MainMenu from './mainMenu';
//staff data syntax [staffType, staff's name, staffID]
var staffdata = [];

class Login extends Component {
  constructor(props){
    super(props);
    //this is where the username and password is stored for the backend
    this.state = {
      username: '',
      password: '',
      signedIn: false
    };
  }

  //this click event will do a post request for the server
  handleClick(e) {
    e.preventDefault();
    axios.post('http://localhost:5000/login', {
        username: this.inputuser.value,
        password: this.inputpassword.value
    })
      .then(response => {
        console.log(response);
        //if the login was successful it will return a 200 code which means OK
        if (response.status === 200) {
          alert("Welcome")
          staffdata.push(response.data.staffType);
          staffdata.push(response.data.username);
          staffdata.push(response.data.staffID);
          this.props.setStaffInfo(staffdata);
          this.setState({signedIn: true});
        }
      })
      .catch(function(error) {
        console.log(error);
        alert("Login failed please try again");
    });
    this.inputuser.value = '';
    this.inputpassword.value = '';
    console.log(staffdata);
  }

  //display the front end for us
  render(){
    if(this.state.signedIn){
      return <Redirect to = {{pathname: "/mainMenu"}}/>
        {/*<MainMenu staffType={staffdata[0]} staffName={staffdata[1]} staffID={staffdata[2]}/>
    </Redirect>;*/}
    } else {
      return (
      <div class = "background">
          <form class = "loginForm">
            <label> Username:
              <input
                type="text"
                name="username"
                id ="username"
                ref = { inuser => this.inputuser = inuser}/>
            </label>
            <br/>
            <label> Password:
              <input
                type="password"
                name="password"
                id ="password"
                ref = {inpass => this.inputpassword = inpass}/>
            </label>
          </form>
          <button type ="button" class="loginButton"
          onClick={this.handleClick.bind(this)}>Login</button>
        <img class="logo" src ={require("./logo.jpg")} alt =""/>
      </div>
    )
    }
  }
}

export default Login;
