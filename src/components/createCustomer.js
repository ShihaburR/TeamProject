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
  const [flexible, setFlexible] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [d1, setD1] = useState(0);
  const [d2, setD2] = useState(0);
  const [d3, setD3] = useState(0);

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
        min : min,
        max : max,
        d1 : d1,
        d2 : d2,
        d3 : d3
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

  const showMenus = (type) => {
    console.log("DType: " + type);
    switch (type) {
      case "0":
        handleSubmit();
        break;
      case "1":
        setFlexible(false);
        setFixed(true);
        break;
      case "2":
        setFixed(false);
        setFlexible(true);
        break;
      default:
        setFixed(false);
        setFlexible(true);
      }
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
            <label>Customer Type (1 for valued, 2 for non-valued):
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
              <option value = "">Select one</option>
              <option value = "1">Fixed</option>
              <option value = "2">Flexible</option>
              <option value = "0">No Discount Plan</option>
            </select>
            <button type="button" onClick={() => {showMenus(discountType)}}>Enter</button>
          </li>
          {flexible &&
          <div>
            <li>
              <h3>Flexible Discount Details</h3>
              <label> Minimum Amount:
                <input type="number" value={min} required onChange={(e) => setMin(e.target.value)}/>
              </label>
              <br/>
              <label> Maximun Amount:
                <input type="number" value={max} required onChange={(e) => setMax(e.target.value)}/>
              </label>
            </li>
            <li>
              <label> 1st Discount %:
                <select value={d1} required onChange={(e) => setD1(e.target.value)}>
                  <option value = "null">Select one</option>
                  <option value = "0">0%</option>
                  <option value = "1">1%</option>
                  <option value = "2">2%</option>
                </select>
              </label>
            </li>
            <li>
              <label> 2nd Discount %:
              <select value={d2} required onChange={(e) => setD2(e.target.value)}>
                <option value = "null">Select one</option>
                <option value = "0">0%</option>
                <option value = "1">1%</option>
                <option value = "2">2%</option>
              </select>
              </label>
            </li>
            <li>
              <label> 3rd Discount %:
              <select value={d3} required onChange={(e) => setD3(e.target.value)}>
                <option value = "null">Select one</option>
                <option value = "0">0%</option>
                <option value = "1">1%</option>
                <option value = "2">2%</option>
              </select>
              </label>
            </li>
            <button type="button" class="small-button" onClick={handleSubmit}>Submit</button>
          </div>
          }
          {fixed &&
            <li>
              <label>Fixed Discount Value:</label>
              <select value={discountRate} required onChange={(e) => setRate(e.target.value)}>
                <option value = "null">Select one</option>
                <option value = "0">0%</option>
                <option value = "1">1%</option>
                <option value = "2">2%</option>
              </select>
              <br/>
              <button type="button" class="small-button" onClick={handleSubmit}>Submit</button>
            </li>

          }
        </ul>
      </div>
      <NavLink to="/mainMenu"><button type="button" class="menu-button">Cancel</button></NavLink>
      </body>
  );
}

export default CreateCustomer;
