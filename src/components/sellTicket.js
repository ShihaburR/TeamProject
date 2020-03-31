import React, {useEffect, useState} from 'react';
import Header from './header';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import CardPayment from './cardPayment';


function SellTicket(props) {
  //page naviagation
  const [blanksData, setData] = useState("");
  const [customerData, setCData] = useState("");
  const [exchangeCodes, setEData] = useState("");
  const [main, setMain] = useState(true);
  const [domestic, setDomestic] = useState(false);
  const [interline, setInterline] = useState(false);
  const [card, setCard] = useState(false);
  const [isDSale,setDSale] = useState(false);
  //sale details
  const [num, setNum] = useState(0);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [local, setLocal] = useState(0);
  const [eCode, setCode] = useState('');
  const [tax, setTax] = useState(0);
  const [otherTax, setotherTax] = useState(0);
  const [converter, setConverter] = useState("");
  const [usd, setUSD] = useState(0);
  const [pType, setPType] = useState(0);
  const [commission, setCommission] = useState(0);
  const [customerFName, setForename] = useState('');
  const [customerSName, setSurname] = useState('');

  //card details
  const [cardNum,setCardNum] = useState("");
  const [nameOnCard,setNameOnCard] = useState("");
  const [expiryDate,setExpiryDate] = useState("");
  const [securityCode,setSecurityCode] = useState("");

  //page render
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
  const getCodes = () => {
    axios.get('http://localhost:5000/rateCodes')
      .then(response => {
        console.log(response.data);
        setEData(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  useEffect(() => {
    getCustomers();
    getBlanks();
    getCodes();
  }, []);

  //add Details
  const addInterlineSale = () => {
    axios.post('http://localhost:5000/addInterlineSale',{
        num : num,
        origin : origin,
        destination : destination,
        eCode : eCode,
        local : local,
        usd : usd,
        tax : tax,
        otherTax : otherTax,
        paymentType : pType,
        cforename : customerFName,
        csurname : customerSName,
        commission : commission,
        cardNum: cardNum,
        nCard: nameOnCard,
        date: expiryDate,
        ccv: securityCode
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
    axios.post('http://localhost:5000/addDomesticSale',{
        num : num,
        origin : origin,
        destination : destination,
        usd : usd,
        tax : tax,
        paymentType : pType,
        cforename : customerFName,
        csurname : customerSName,
        commission : commission,
        cardNum: cardNum,
        nCard: nameOnCard,
        date: expiryDate,
        ccv: securityCode
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
  const convert = (local,converter) => {
    var converted = (local * converter).toFixed(4);
    setUSD(converted);
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
    console.log(pType);
    switch (pType) {
      case "2":
        setDSale(true);
        getCardMenu();
        break;
      default:
        if(domestic){
          addDomesticSale();
        }
        else{addInterlineSale();}
        break;
    }
  }
  const sender = () => {
    if(isDSale){
      addDomesticSale();
    } else {
      addInterlineSale();
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
            <label>Origin:</label>
            <input
              type="text"
              value={origin}
              required onChange={(e) => setOrigin(e.target.value)}/>
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
            <option value = "1">Cash</option>
            <option value = "2">Card</option>
            <option value = "3">Valued</option>
          </select>
          </li>
          <li>
            <label>Commission Rate:
            <input type="number" value={commission}
            required onChange={(e) => setCommission(e.target.value)}/>
            </label>
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
            <label>ExchangeCode:</label>
            <select>

            </select>
            <br/><br/>
            <label> Amount:
              <input
                type="number"
                value={local}
                required onChange={(e) => setLocal(e.target.value)}/>
            </label>
          </li>
          <li>
            <label>USD rate:
              <input type="number" value={converter}
                required onChange={(e) => setConverter(e.target.value)}/>
              <button type="button" onClick={() => convert(local,converter)}>Convert</button>
            </label>
            <label style={{padding: "10px"}}> USD Value:
                {" " + usd}
            </label>
          </li>
          <li>
            <label> Local Tax:
              <input
                type="number"
                value={tax}
                required onChange={(e) => setTax(e.target.value)}/>
            </label>
          </li>
          <li>
            <label> Other Tax:
              <input
                type="number"
                value={otherTax}
                required onChange={(e) => setotherTax(e.target.value)}/>
            </label>
          </li>
          <li>
          <label>Payment Type:</label>
          <select value = {pType} required onChange={(e) => setPType(e.target.value)}>
            <option value = "0">Select one</option>
            <option value = "1">Cash</option>
            <option value = "2">Card</option>
            <option value = "3">Valued</option>
          </select>
          </li>
          <li>
            <label>Commission Rate:
            <input type="number" value={commission}
            required onChange={(e) => setCommission(e.target.value)}/>
            </label>
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
                  <li><input type="text" value={cardNum} required onChange={(e) => setCardNum(e.target.value)}/></li>
                  <li><label>Expiry Date (set any day):</label></li>
                  <li><input type="date" value={expiryDate} required onChange={(e) => setExpiryDate(e.target.value)}/></li>
              </ul>
              <ul>
                  <li><label>Name on Card:</label></li>
                  <li><textarea value={nameOnCard} required onChange={(e) => setNameOnCard(e.target.value)}></textarea></li>
                  <li><label>Security Code:</label></li>
                  <li><input type="number" value={securityCode} required onChange={(e) => setSecurityCode(e.target.value)}/>></li>
              </ul>
              <li align="center">
                <NavLink to="/mainMenu"><button type="button" class="small-button" onClick={sender}>Pay</button></NavLink>
                <NavLink to="/mainMenu"><button type="button" class="small-button">Cancel</button></NavLink>
              </li>
          </div>
      </body>
    )
  }
}

export default SellTicket;
