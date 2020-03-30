import React, {useEffect, useState} from 'react';
import Header from './header';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import CardPayment from './cardPayment';


function SellTicket(props) {
  //page naviagation
  const [blanksData, setData] = useState("");
  const [customerData, setCData] = useState("");
  const [main, setMain] = useState(true);
  const [domestic, setDomestic] = useState(false);
  const [interline, setInterline] = useState(false);
  const [card, setCard] = useState(false);

  //sale details
  const [num, setNum] = useState(0);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [local, setLocal] = useState(0);
  const [eCode, setCode] = useState('');
  const [tax, setTax] = useState(0);
  const [localTax, setLocalTax] = useState(0);
  const [usd, setUSD] = useState(0);
  const [pType, setPType] = useState("");
  const [customerFName, setForename] = useState('');
  const [customerSName, setSurname] = useState('');

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
  const getCustomers = () => {
    axios.get('http://localhost:5000/customers')
      .then(response => {
        console.log(response.data);
        setCData(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  //page render
  useEffect(() => {
    getCustomers();
    getBlanks();
  }, []);

  //add Details
  const addCard = () => {
      console.log(cardNum + " " + nameOnCard + " " + expiryDate + " " + securityCode);
      axios.post('http://localhost:5000/addCardDetails', {
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
  const addInterlineSale = () => {
    axios.post('https://localhost:5000/addInterlineSale',{
        num : num,
        origin : origin,
        destination : destination,
        local : local,
        usd : usd,
        paymentType : pType,
        cforename : customerFName,
        csurname : customerSName,
        cardNum: cardNum,
        nCard: nameOnCard,
        date: expiryDate,
        ccv: setSecurityCode
    })
      .then(response => {
        if(response.status === 200){
          alert("Sale has been added");
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
  const addDomesticSale = () => {
    axios.post('https://localhost:5000/addDomesticSale',{
        num : num,
        origin : origin,
        destination : destination,
        usd : usd,
        paymentType : pType,
        cforename : customerFName,
        csurname : customerSName,
        cardNum: cardNum,
        nCard: nameOnCard,
        date: expiryDate,
        ccv: setSecurityCode
    })
      .then(response => {
        if(response.status === 200){
          alert("Sale has been added");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  const convert = () => {
    var one = 1;

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
      if(domestic){
        addDomesticSale();
        console.log("Made it");
        getCardMenu();
      } else{
        addInterlineSale();
        console.log("Made it");
        getCardMenu();
      }
    } else {
      alert("Choose a valid Payment Type");
    }
  }

  if(main){
    return (
      <body class="indexbody">
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
        <div align="center">
          <br/>
          <label class="page-button">Add Sales</label>
          <br/>
          <button type="button" class="small-button" onClick={getDomesticMenu}>Add Domestic Sale</button>
          <button type="button" class="small-button" onClick={getInterlineMenu}>Add Interline Sale</button>
          <NavLink to="/mainMenu"><button type="button" class="small-button-right">Done</button></NavLink>
        </div>
        <br/>
        <div id="tablecontainerrefund" style = {{display: "center", float: "inline-block"}}>
          <table style={{width: "50%", float: "left"}} className="striped responsive-table">
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
          <table style={{width: "50%", float: "left"}} className="striped responsive-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(customerData) && customerData.length > 0 && customerData.map(r => (
            <tr key={r.customerID} id={r.customerID}>
              <td align="center">{r.customerID}</td>
              <td align="center">{r.name + " " + r.surname}</td>
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
       <div align="center">
         <br/>
         <label class="page-button">Insert Domestic Sale</label>
       </div>
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
            <label> Amount:
              <input
                type="number"
                value={usd}
                required onChange={(e) => setUSD(e.target.value)}/>
            </label>
          </li>
          <li>
            <label> Tax:
              <input
                type="number"
                value={tax}
                required onChange={(e) => setTax(e.target.value)}/>
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
            <label>Customer Forename:
            <input type="text" value={customerFName}
            required onChange={(e) => setForename(e.target.value)}/>
            </label>
          </li>
          <li>
            <label>Customer Surname:
            <input type="text" value={customerSName}
            required onChange={(e) => setSurname(e.target.value)}/>
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
         <div align="center">
           <br/>
           <label class="page-button">Insert Interline Sale</label>
         </div>
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
            <label> Local Tax:
              <input
                type="number"
                value={localTax}
                required onChange={(e) => setLocalTax(e.target.value)}/>
            </label>
          </li>
          <li>
            <label> Other Tax:
              <input
                type="number"
                value={tax}
                required onChange={(e) => setTax(e.target.value)}/>
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
            <label>Customer Forename:
            <input type="text" value={customerFName}
            required onChange={(e) => setForename(e.target.value)}/>
            </label>
          </li>
          <li>
            <label>Customer Surname:
            <input type="text" value={customerSName}
            required onChange={(e) => setSurname(e.target.value)}/>
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
              <label class="page-button">Card Payment</label>
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
