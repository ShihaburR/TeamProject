import React, { useState } from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function CardPayment(props) {
    const [cardNum,setCardNum] = useState(""); 
    const [nameOnCard,setNameOnCard] = useState("");
    const [expiryDate,setExpiryDate] = useState("");
    const [securityCode,setSecurityCode] = useState("");

    const handleSubmit = () => {
        console.log(cardNum + " " + nameOnCard + " " + expiryDate + " " + securityCode);
        axios.post('/cardPayment', {
            cardNum: cardNum,
            nameOnCard: nameOnCard,
            expiryDate: expiryDate,
            securityCode: setSecurityCode
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }


  return (
    <body>
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

        <div id="mainmenu">
            <button type="button" class="page-button">Card Payment</button>
        </div>

        <div id="menubox">
            <ul>
                <li><label>Card number:</label></li>
                <li><textarea value={cardNum} required onChange={(e) => setCardNum(e.target.value)}></textarea></li>
                <li><label>Expiry Date:</label></li>
                <li><textarea value={expiryDate} required onChange={(e) => setExpiryDate(e.target.value)}></textarea></li>
            </ul>
            <ul>
                <li><label>Name on Card:</label></li>
                <li><textarea value={nameOnCard} required onChange={(e) => setNameOnCard(e.target.value)}></textarea></li>
                <li><label>Security Code:</label></li>
                <li><textarea value={securityCode} required onChange={(e) => setSecurityCode(e.target.value)}></textarea></li>
            </ul>
        </div>

        <button type="button" class="menu-button" onClick={handleSubmit}>Save</button>
        <NavLink to="/mainMenu"><button type="button" class="menu-button">Pay</button></NavLink>
        <NavLink to="/payment"><button type="button" class="menu-button">Use Existing Card</button></NavLink>
        <NavLink to="/mainMenu"><button type="button" class="menu-button">Cancel</button></NavLink>
    </body>
  );
}

export default CardPayment;