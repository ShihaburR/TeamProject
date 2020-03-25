import React, { useState, Component, useEffect } from 'react';
import planeheader from './planeheader.jpg';
import moment from 'moment';



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

  return (
    <div id="header-wrapper">
        <div id="header-details">
            <ul>
                <li><a><b>{props.staffType}</b></a></li>
                <li><a>Name: {props.staffName}</a></li>
                <li><a>Staff ID: {props.staffID}</a></li>
                <li><button type="button" class="logout-button">Log out</button></li>
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
