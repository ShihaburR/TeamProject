import React, {useEffect, useState} from 'react';
import Header from './header';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import CardPayment from './cardPayment';


function SellTicket(props) {
  //page naviagation
  const [blanksData, setData] = useState("");
  const [main, setMain] = useState(true);
  const [domestic, setDomestic] = useState(false);
  const [interline, setInterline] = useState(false);
  const [card, setCard] = useState(false);

  //sale details
  const [num, setNum] = useState(0);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [local, setLocal] = useState(0);
  const [usd, setUSD] = useState(0);
  const [pType, setPType] = useState("");
  const [customer, setCustomer] = useState('');

  //card details
  const [cardNum,setCardNum] = useState("");
  const [nameOnCard,setNameOnCard] = useState("");
  const [expiryDate,setExpiryDate] = useState("");
  const [securityCode,setSecurityCode] = useState("");
  const [converter, setConverter] = useState("");
  const getBlanks = () => {
    axios.get('http://localhost:5000/advisorBlanks')
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  //page render
  useEffect(() => {
    getBlanks();
  }, []);

  //add Details
  const addCard = () => {
      console.log(cardNum + " " + nameOnCard + " " + expiryDate + " " + securityCode);
      axios.post('http://localhost:5000/cardPayment', {
          cardNum: cardNum,
          nCard: nameOnCard,
          date: expiryDate,
          ccv: setSecurityCode
      })
      .then(response => {
        if(response.status === 200){
          alert("Payment has been made. Returning to Main Menu");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  const handleClick = () => {
    /*axios.post('https://localhost:5000/addSale',{

    })
      .then(response => {

      })
      */
      console.log("Actions run here");
    }

  //menu navigation
  const getDomesticMenu = () => {
    setDomestic(true);
    setMain(false);
    setInterline(false);
    setCard(false);
  }
  const getInterlineMenu = () => {
    setInterline(true);
    setDomestic(false);
    setMain(false);
    setCard(false);
  }
  const getMainMenu = () => {
    setMain(true);
    setDomestic(false);
    setInterline(false);
    setCard(false);
  }
  const getCardMenu = () => {
    setCard(true);
    setMain(false);
    setDomestic(false);
    setInterline(false);
  }
  const getCardInput = (pType) => {
    if(pType.includes("Card")) {
      handleClick();
      console.log("Made it");
      getCardMenu();
    } else {
      alert()
    }
  }

  if(main){
    return (
      <body class="indexbody">
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
        <div align="center">
          <h2>Add Sales</h2>
          <button type="button" class="small-button" onClick={getDomesticMenu}>Add Domestic Sale</button>
          <button type="button" class="small-button" onClick={getInterlineMenu}>Add Interline Sale</button>
          <NavLink to="/mainMenu"><button type="button" class="small-button-right">Done</button></NavLink>
        </div>
        <br/>
        <div id="tablecontainerrefund">
        <table className="striped responsive-table">
          <thead>
            <tr>
              <th>Blank Number</th>
              <th>Blank Type</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(blanksData) && blanksData.length > 0 && blanksData.map(r => (
            <tr key={r.blankNumber} id={r.blankNumber}>
              <td>{r.blankNumber}</td>
              <td align="center">{(r.blankNumber.toString()).slice(0,3)}</td>
            </tr>
            ))}
          </tbody>
        </table>
        </div>
      ​</body>
    );
  } else if(domestic){
    return (
      <body class="indexbody">
       <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
       <h1 align="center">Insert Domestic Sale</h1>
       <div id="menubox" align="center" class="mainSize">
        <ul>
          <li>
            <label> Blank Number:
              <input
                type="number"
                value={num}
                required onChange={(e) => setNum(e.target.value)}/>
            </label>
          </li>
          <li>
            <label> Origin:
              <input
                type="text"
                value={origin}
                required onChange={(e) => setOrigin(e.target.valueAsNumber)}/>
            </label>
          </li>
          <li>
            <label> Destination:
              <input
                type="text"
                value={destination}
                required onChange={(e) => setDestination(e.target.value)}/>
            </label>
          </li>
          <li>
            <label> Amount (Local Currency):
              <input
                type="number"
                value={local}
                required onChange={(e) => setLocal(e.target.value)}/>
            </label>
          </li>
          <li>
            <label> Amount in USD:
              <input
                type="number"
                value={converter}
                required onChange={(e) => setConverter(e.target.value)}/>
              <label>{usd}</label>
            </label>
          </li>
          <li>
          <label>Payment Type:</label>
          <select value = {pType} required onChange={(e) => setPType(e.target.value)}>
            <option value = "0">Select one</option>
            <option value = "Cash">Cash</option>
            <option value = "Card">Card</option>
          </select>
          </li>
          <li>
            <label>Customer:
            <input type="text" value={customer}
            required onChange={(e) => setCustomer(e.target.value)}/>
            </label>
          </li>
         <button type="submit" value="Enter" class= "small-button"
         onClick={() => {getCardInput(pType);}}>Enter</button>
         <button class="small-button" onClick={getMainMenu}>Go Back</button>
        </ul>
       </div>
      </body>
    )
  } else if(interline){
    return (
      <body class="indexbody">
       <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
       <h1 align="center">Insert Domestic Sale</h1>
       <div id="menubox" align="center" class="mainSize">
        <ul>
          <li>
            <label> Blank Number:
              <input
                type="number"
                value={num}
                required onChange={(e) => setNum(e.target.value)}/>
            </label>
          </li>
          <li>
            <label> Origin:
              <input
                type="text"
                value={origin}
                required onChange={(e) => setOrigin(e.target.valueAsNumber)}/>
            </label>
          </li>
          <li>
            <label> Destination:
              <input
                type="text"
                value={destination}
                required onChange={(e) => setDestination(e.target.value)}/>
            </label>
          </li>
          <li>
            <label> Amount (Local Currency):
              <input
                type="number"
                value={local}
                required onChange={(e) => setLocal(e.target.value)}/>
            </label>
          </li>
          <li>
            <label> Amount in USD:
              <input
                type="number"
                value={usd}
                required onChange={(e) => setUSD(e.target.value)}/>
            </label>
          </li>
          <li>
          <label>Payment Type:</label>
          <select value = {pType} required onChange={(e) => setPType(e.target.value)}>
            <option value = "0">Select one</option>
            <option value = "Cash">Cash</option>
            <option value = "Card">Card</option>
          </select>
          </li>
          <li>
            <label>Customer:
            <input type="text" value={customer}
            required onChange={(e) => setCustomer(e.target.value)}/>
            </label>
          </li>
         <button type="submit" value="Enter" class= "small-button"
         onClick={() => {getCardInput(pType);}}>Enter</button>
         <button class="small-button" onClick={getMainMenu}>Go Back</button>
        </ul>
       </div>
      </body>
    )
  } else if(card){
    return (
      <body class="indexbody">
          <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
          <div id="mainmenu">
              <button type="button" class="page-button">Card Payment</button>
          </div>
          <div id="menubox" class="mainSize">
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
              <li align="center">
                <NavLink to="/mainMenu"><button type="button" class="small-button" onClick={addCard}>Pay</button></NavLink>
                <NavLink to="/mainMenu"><button type="button" class="small-button">Cancel</button></NavLink>
              </li>
          </div>
      </body>
    )
  }
}

export default SellTicket;
