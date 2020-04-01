import React, { useState } from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function CreateCustomer(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [valued, setValue] = useState("");
  const [discountRateID, setRateID] = useState("");
  const [discountType, setType] = useState("");
  const [discountRate, setRate] = useState("");

  const handleSubmit = () => {
      axios.post('http://localhost:5000/createCustomer',{
        firstname : firstName,
        lastname : lastName,
        address : address,
        email : email,
        valued: valued,
        discountrate : discountRate,
        discounttype : discountType,
        drateID : discountRateID,
      })
        .then(response => {
          if(response.status === 200){
            alert("Customer created");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
  }

  return (
    <body class="indexbody">
      <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
      <div id="mainmenu">
          <button type="button" class="page-button" onClick={handleSubmit}>Create Customer Account</button>
      </div>
      <div id="menubox" class="mainSize">
          <ul>
              <li><label>First Name:</label></li>
              <li><textarea value={firstName} required onChange={(e) => setFirstName(e.target.value)}></textarea></li>
              <li><label>Last Name:</label></li>
              <li><textarea value={lastName} required onChange={(e) => setLastName(e.target.value)}></textarea></li>
          </ul>
          <ul>
              <li><label>Address:</label></li>
              <li><textarea value={address} required onChange={(e) => setAddress(e.target.value)}></textarea></li>
              <li><label>Email:</label></li>
              <li><textarea value={email} required onChange={(e) => setEmail(e.target.value)}></textarea></li>
          </ul>
          <ul>
            <li>
              <label>Customer Type: (1 for valued, 2 for non-valued):
              <select value={valued} required onChange={(e) => setValue(e.target.value)}>
                <option value = "0">Select one</option>
                <option value = "1">Valued</option>
                <option value = "2">Non-Valued</option>
                <option value = "3">Casual</option>
              </select>
              </label>
            </li>
            <li>
              <h3>Discount Plan</h3>
              <label>DiscountType:</label>
              <select value={discountType} required onChange={(e) => setType(e.target.value)}>
                <option value = "0">Select one</option>
                <option value = "1">Fixed</option>
                <option value = "2">Flexible</option>
              </select>
            </li>
            <li>
              <label>Fixed Discount Value:</label>
              <select value={discountRate} required onChange={(e) => setRate(e.target.value)}>
                <option value = "null">Select one</option>
                <option value = "0">0%</option>
                <option value = "1">1%</option>
                <option value = "2">2%</option>
              </select>
            </li>
            /* need to figure out how to display this based on previous dropdown choice
            <label>Flexible Discount Value:</label>
            <select value={discountRate} required onChange={(e) => setRate(e.target.value)}>
              <option value = "null">Select one</option>
              <option value = "0">0%</option>
              <option value = "1">1%</option>
              <option value = "2">2%</option>
            </select> */
          </ul>
      </div>
      <NavLink to="/mainMenu"><button type="button" class="menu-button">Cancel</button></NavLink>
      </body>
  );
}

export default CreateCustomer;
