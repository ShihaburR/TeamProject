import React, { useState } from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';

function CreateCustomer(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        console.log(firstName + " " + lastName + " " +  address + " " +  email);
    }

  return (
    <body>
    <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

    <div id="mainmenu">
        <button type="button" class="page-button">Create Customer Account</button>
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
    </div>

    <button type="button" class="menu-button" onClick={handleSubmit}>Save</button>
    <NavLink to="/mainMenu"><button type="button" class="menu-button">Cancel</button></NavLink>
    
</body>
  );
}

export default CreateCustomer;