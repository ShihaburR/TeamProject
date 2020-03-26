import React, { useState, Component, useEffect } from 'react';
import planeheader from './planeheader.jpg';
import moment from 'moment';
import {NavLink, Redirect} from "react-router-dom";
import Login from './login';
import axios from 'axios';

function Header(props) {
    //const [dateTime, setDateTime] = useState(new Date());
    const [date, setDate] = useState(moment().format('DD/MM/YYYY'));
    const [time,setTime] = useState(moment().format('HH:mm:ss'));

    const currentTime = () => {
        setDate(moment().format('DD/MM/YYYY'));
        setTime(moment().format('HH:mm:ss'));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            currentTime()
        }, 1000);
            return () => clearInterval(interval);
    },[])

    const logout = () => {
      alert("Signing out of System, Goodbye " + props.staffName);
        axios.get('http://localhost:5000/logout')
          .then(response => {})
          .catch(function(error) {
            console.log(error);
          });
    }

  return (
    <div id="header-wrapper">
        <div id="header-details">
            <ul>
                <li><a><b>{props.staffType}</b></a></li>
                <li><a>Name: {props.staffName}</a></li>
                <li><a>Staff ID: {props.staffID}</a></li>
                <li><NavLink to="/"><button type="button" class="logout-button" onClick ={logout}>Log out</button></NavLink></li>
            </ul>
        </div>
        <div id="datetime">
            <ul>
                <li><a>{time}</a></li>
                <li><a>{date}</a></li>
            </ul>
        </div>
        <div>
            <img src={planeheader} alt="" class="header-image" />
        </div>
    </div>
  );
}

export default Header;
