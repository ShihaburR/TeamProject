import React, {Component, useState, useEffect} from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function ViewCustomer(props) {
  const [customers, setData] = useState('');

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

  return (
    <body class="indexbody">
      <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
      <div id="mainmenu">
        <button type="button" class="page-button" onClick={getCustomers}>View Customers</button>
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
          </tbody>
        </table>
        <NavLink to="/mainMenu"><button type="button" class="small-button-right" onclick="document.location = '../Menu/MainMenuManager.html'">Done</button></NavLink>
      </div>
    </body>
  );
}

export default ViewCustomer;
