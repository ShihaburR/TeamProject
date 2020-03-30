import React, {useEffect, useState} from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function SellTicket(props) {
  //page naviagation
  const [blanksData, setData] = useState("");
  const [main, setMain] = useState(true);
  const [domestic, setDomestic] = useState(false);
  const [interline, setInterline] = useState(false);

  //sale data
  const [num, setNum] = useState(0);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [local, setLocal] = useState(0);
  const [usd, setUSD] = useState(0);
  const [pType, setPType] = useState(0);
  const [customer, setCustomer] = useState('');

  //card details
  const [cardName, setCardName] = useState('');
  const [cardNum, setCardNum] = useState(0);
  const [cardCCV, setCardCCV] = useState(0);
  const [cardDate, setCardDate] = useState('');

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

  useEffect(() => {
    getBlanks();
  }, []);

  const getDomesticMenu = () => {
    setDomestic(true);
    setMain(false);
    setInterline(false);
  }

  const getInterlineMenu = () => {
    setInterline(true);
    setDomestic(false);
    setMain(false);
  }

  const getMainMenu = () => {
    setMain(true);
    setDomestic(false);
    setInterline(false);
  }

  const handleClick = () => {

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
                value={usd}
                required onChange={(e) => setUSD(e.target.value)}/>
            </label>
          </li>
          <li>
          <label>Payment Type:
          <select value = {pType} required onChange={(e) => setPType(e.target.value)}>
            <option value = "0">Select one</option>
            <option value = "Cash">Cash</option>
            <option value = "Card">Card</option>
          </select>
          </label>
          </li>
          <li>
            <label>Customer:
            <input type="text" value={customer}
            required onChange={(e) => setCustomer(e.target.value)}/>
            </label>
          </li>
         <button type="submit" value="Enter" class= "small-button"
         onClick={handleClick.bind(this)}>Enter</button>
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
          <label>Payment Type:
          <select value = {pType} required onChange={(e) => setPType(e.target.value)}>
            <option value = "0">Select one</option>
            <option value = "Cash">Cash</option>
            <option value = "Card">Card</option>
          </select>
          </label>
          </li>
          <li>
            <label>Customer:
            <input type="text" value={customer}
            required onChange={(e) => setCustomer(e.target.value)}/>
            </label>
          </li>
         <button type="submit" value="Enter" class= "small-button"
         onClick={handleClick.bind(this)}>Enter</button>
         <button class="small-button" onClick={getMainMenu}>Go Back</button>
        </ul>
       </div>
      </body>
    )
  }
}

export default SellTicket;
