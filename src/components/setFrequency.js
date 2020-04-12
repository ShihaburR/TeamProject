import React, { useState } from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function SetFrequency(props) {
    const [period, setPeriod] = useState("");
    const [day, setDay] = useState("");
    const [time, setTime] = useState("");

    const handleSubmit = () => {
      axios.post('http://localhost:5000/setSchedule', {
      schedule: period,
      day : day,
      time : time
    })
    .then(response => {
      alert("Backup Service will run as scheduled");
    })
    .catch(error => {
      console.log(error);
    })
    }

  return (
    <body class="indexbody">

        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

        <div id="mainmenu">

            <button type="button" class="page-button">Set Frequency</button>

        </div>

        <div id="menubox">


            <h2>How often do you want to backup?</h2>
            <p>Files that have changed and new files that have been created since your last backup <br />will be added to your backup according to the schedule set blow.</p>
            <input type="checkbox" id="enable-backup" name="enable-backup" value="enable" />
            <label for="enable-backup"> Run backup on schedule (recommended)</label><br /><br />

            <label for="often"><font size="4">How often: &emsp; </font></label>
            <select id="often" value={period} required onChange={(e) => setPeriod(e.target.value)}>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="daily">Daily</option>
                <option value="hourly">Hourly</option>
            </select><br /><br />

            <label for="often"><font size="4">Select day: &emsp; </font></label>
            <select id="often" value={day} required onChange={(e) => setDay(e.target.value)}>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">sunday</option>
            </select><br /><br />


            <label for="often"><font size="4">Select time: &emsp; </font></label>
            <select id="often" value={time} required onChange={(e) => setTime(e.target.value)}>
                <option value="0100">1am</option>
                <option value="0200">2am</option>
                <option value="0300">3am</option>
                <option value="0400">4am</option>
                <option value="0500">5am</option>
                <option value="0600">6am</option>
                <option value="0700">7am</option>
                <option value="0800">8am</option>
                <option value="0900">9am</option>
                <option value="1000">10am</option>
                <option value="1100">11am</option>
                <option value="1200">12pm</option>
                <option value="1300">1pm</option>
                <option value="1400">2pm</option>
                <option value="1500">3pm</option>
                <option value="1600">4pm</option>
                <option value="1700">5pm</option>
                <option value="1800">6pm</option>
                <option value="1900">7pm</option>
                <option value="2000">8pm</option>
                <option value="2100">9pm</option>
                <option value="2200">10pm</option>
                <option value="2300">11pm</option>
                <option value="0000">12am</option>
            </select><br /><br />

            <button type="button" class="small-button-right" onSubmit={handleSubmit}>Apply changes</button>

            <p>{period} {day} {time}</p>

        </div>
            <NavLink to="/mainMenu"><button type="button" class="small-button-right" onclick="document.location = '../Menu/MainMenuAdmin.html'">Cancel</button></NavLink>
    </body>
  );
}

export default SetFrequency;
