import React, {Component} from 'react';
import axios from 'axios';
import Background from './loginBK.jpg';


class Login extends Component {
  constructor(props){
    super(props);
    //this is where the username and password is stored for the backend
    this.state = {username: '', password: ''};
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
        }
      })
      .catch(function(error) {
        console.log(error);
        alert("Login failed please try again");
    });
    this.inputuser.value = '';
    this.inputpassword.value = '';
  }

  //display the front end for us
  render(){
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

export default Login;
