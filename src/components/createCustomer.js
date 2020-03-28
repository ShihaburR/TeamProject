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
    const [discountTypeID, setTypeID] = useState("");
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
          dtypeID : discountTypeID
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
    <body>
    <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

    <div id="mainmenu">
        <button type="button" class="page-button" onClick={handleSubmit}>Create Customer Account</button>
    </div>

    <div id="menubox">
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
            <label> Valued Customer (1 for valued, 2 for non-valued):</label>
            <input value={valued} required onChange={(e) => setValue(e.target.value)}/>
          </li>
          <li>
            <h3>Discount Plan</h3>
            <label>Type ID:</label> <input type="number" value={discountTypeID}
            required onChange={(e) => setTypeID(e.target.value)}/>
          </li>
          <li>
            <label>DiscountType:</label> <br/>
            <textarea value={discountType} required onChange={(e) => setType(e.target.value)}></textarea>
          </li>
          <li>
            <label>Rate ID:</label> <input type="number" value={discountRateID}
            required onChange={(e) => setRateID(e.target.value)}/>
          </li>
          <li>
            <label>Discount % (only specify 1):</label>
            <input type="text" value={discountRate} required onChange={(e) => setRate(e.target.value)}/>
          </li>
        </ul>
    </div>

    <NavLink to="/mainMenu"><button type="button" class="menu-button">Cancel</button></NavLink>

</body>
  );
}

export default CreateCustomer;
