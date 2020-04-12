import React, {Component, useState, useEffect} from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import searchIcon from './images/search-icon.png';

function ViewCustomer(props) {
  const [customers, setData] = useState('');
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    axios.get('http://localhost:5000/customers')
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  const removeCustomer = (id) => {
    axios.post('http://localhost:5000/removeCustomer', {
      id : id
    })
      .then(response => {
        if(response.status === 200){
          alert("Customer Removed");
          getCustomers();
        }
      })
      .catch(function(error) {
        console.log(error);
        alert("Deletion failed");
      });
  }

  const reActivate = (id) => {
    axios.post('http://localhost:5000/reactivateCustomer', {
      id : id
    })
      .then(response => {
        alert("Customer is now Activated");
        getCustomers();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  const filter = () => {
    axios.post('http://localhost:5000/searchCustomers', {
      details : search
    })
    .then(response => {
      console.log(response.data);
      setData(response.data);
      console.log(customers);
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <body class="indexbody">
      <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
      <div id="mainmenu">
        <button type="button" class="page-button">View Customers</button>
        <div>
          <br/>
          <input type="text" value={search} placeholder= "Enter customer name or id.." class="search_bar"
          required onChange={(e) => setSearch(e.target.value)}/>
          <button type="button" class="search_submit" onClick={() => {filter();}}>
            <img src={searchIcon} alt="Search"  height="17.5" width="16"/>
          </button>
          <br/>
          <NavLink to="/mainMenu"><button type="button" class="small-button-right" onclick="document.location = '../Menu/MainMenuManager.html'">Done</button></NavLink>
          <button type="button" class="small-button" onClick={getCustomers}>Reload Table</button>
        </div>
      </div>
      <div id="tablecontainerrefund">
        <table className="striped responsive-table">
          <thead>
            <tr>
              <th>CustomerID</th>
              <th>Full Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Customer Type</th>
              <th>Active?</th>
              <th>Remove</th>
              <th>Restore</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(customers) && customers.length > 0 && customers.map(r => (
            <tr key={r.customerID} id={r.customerID}>
              <td align="center">{r.customerID}</td>
              <td align="center">{r.name.toString() + " " + r.surname.toString()}</td>
              <td align="center">{r.address}</td>
              <td align="center">{r.email}</td>
              <td align="center">{r.customerTypeID}</td>
              <td align="center">{r.active}</td>
              <td align="center"><button type="button" value={r.customerID}
               onClick ={() => {removeCustomer(r.customerID)}}>Delete</button></td>
               <td align="center"><button type="button" value={r.customerID}
                onClick ={() => {reActivate(r.customerID)}}>Activate</button></td>
            </tr>
            ))}
            {console.log(customers)}
          </tbody>
        </table>
        <br/>
      </div>
    </body>
  );
}

export default ViewCustomer;
