import React, { useState, useEffect } from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function LatePayment(props) {
    const [bData, setData] = useState([]);
    const [blankID, setBlankID] = useState("");
    const [main, setMain] = useState(true);
    const [card, setCard] = useState(false);
    const [amount, setAmount] = useState(0);

    //card details
    const [cardNum,setCardNum] = useState("");
    const [nameOnCard,setNameOnCard] = useState("");
    const [expiryDate,setExpiryDate] = useState("");
    const [securityCode,setSecurityCode] = useState("");

    const getAmount = () => {
      axios.post('http://localhost:5000/lateAmount', {
        num : blankID
      })
      .then(response => {
        setAmount(response.data[0].amountUSD);
      })
      .catch(error => {
        console.log(error);
      })
    }

    const getCardMenu = () => {
      setMain(false);
      setCard(true);
    }

    const handleSubmit = () => {
        axios.post('http://localhost:5000/LatePayment', {
          blank : blankID,
          cardNum : cardNum,
          date : expiryDate,
          ccv : securityCode

        })
        .then(response => {
          if(response.status === 200){
            alert("Late payment has been made");
          }

        })
        .catch(error => {
          console.log(error);
          if(error.response.status === 400){
            alert("You have chosen a blank number that has already been paid for." +
            " Please choose another blank to submit a late payment");
          } else if (error.response.status === 401) {
              alert("Something went wrong, please try again or contact your adminsitrator");
          }
        });
    }

    const getBlanks = () => {
      axios.get('http://localhost:5000/advisorLateBlanks')
        .then(response => {
          setData(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    useEffect(() => {
      getBlanks();
    },[])

    if(main) {
      return (
        <body class="indexbody">
            <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
            <div id="mainmenu">
                <button type="button" class="page-button">Late Payment</button>
            </div>
            <div id="menubox" class="mainSize" align="center">
            <br/><br/><br/><br/>
            <label>Amount Required: ${amount}</label>
            <br/><br/>
              <label>Blank Number:
                <select value={blankID} onChange={(e) => setBlankID(e.target.value)}>
                  <option value="0">"Select a Blank Number"</option>
                  {bData.map(r => (
                    <option key={r.blankNumber} value={r.blankNumber}>
                    {r.blankNumber}
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" onClick={getAmount}>Enter</button>
              <br/><br/>
              <button type="button" class="small-button" onClick={handleSubmit}>Pay by Cash</button>
              <button type="button" class="small-button" onClick={getCardMenu}>Pay by Card</button>
              <NavLink to="/mainMenu"><button type="button" class="small-button">Cancel</button></NavLink>
            </div>
        </body>
      );
    } else if(card){
        return (
          <body class="indexbody">
              <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
              <div id="mainmenu">
                  <label class="page-button">Card Payment</label>
              </div>
              <div id="menubox" class="mainSize">
                  <ul>
                      <li><label>Card number:</label></li>
                      <li><input type="text" maxLength="16" value={cardNum} required onChange={(e) => setCardNum(e.target.value)}/></li>
                      <li><label>Expiry Date (set any day):</label></li>
                      <li><input type="date" value={expiryDate} required onChange={(e) => setExpiryDate(e.target.value)}/></li>
                  </ul>
                  <ul>
                      <li><label>Name on Card:</label></li>
                      <li><textarea value={nameOnCard} required onChange={(e) => setNameOnCard(e.target.value)}></textarea></li>
                      <li><label>CCV:</label></li>
                      <li><input type="number" value={securityCode} required onChange={(e) => setSecurityCode(e.target.value)}/></li>
                  </ul>
                  <li align="center">
                    <NavLink to="/mainMenu"><button type="button" class="small-button" onClick={handleSubmit}>Pay</button></NavLink>
                    <NavLink to="/mainMenu"><button type="button" class="small-button">Cancel</button></NavLink>
                  </li>
              </div>
          </body>
        );
    }

}

export default LatePayment;
