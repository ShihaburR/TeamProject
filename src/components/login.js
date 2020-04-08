import React, {useState} from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";

//staff data syntax [staffType, staff's name, staffID]
let staffdata = [];

function Login(props) {
  // Creating states and setter methods
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signedIn, setSignedIn] = useState(false);

  //this click event will do a post request for the server
  const handleClick = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', {
        username: username,
        password: password
    })
      .then(response => {
        console.log(response);
        //if the login was successful it will return a 200 code which means OK
        if (response.status === 200) {
          alert("Welcome " + response.data.username);
          staffdata.push(response.data.staffType);
          staffdata.push(response.data.username);
          staffdata.push(response.data.staffID);
          props.getStaffInfo(staffdata);
          setSignedIn(true);
        }
      })
      .catch(function(error) {
        console.log(error);
        alert("Login failed please try again");
    });
    setUsername('');
    setPassword('');
    console.log(staffdata);
    staffdata = [];
  }

  //display the front end for us
  if(signedIn){
    return <Redirect to = {{pathname: "/mainMenu"}}/>
  } else {
      return (
          <body>
            <div class = "background">
                  <form class = "loginForm">
                    <label> Username:
                      <input
                        type="text"
                        name="username"
                        id ="username"
                        value={username} required onChange={(e) => setUsername(e.target.value)}/>
                    </label>
                    <br/>
                    <label> Password:
                      <input
                        type="password"
                        name="password"
                        id ="password"
                        value={password} required onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                  </form>
                  <button type ="button" class="loginButton"
                  onClick={handleClick.bind(this)}>Login</button>
                <img class="logo" src ={require("./images/logo.jpg")} alt =""/>
              </div>
          </body>
  )
  }
}

export default Login;
