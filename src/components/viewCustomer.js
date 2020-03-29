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
            </tr>
          </thead>
          <tbody>
            {Array.isArray(customers) && customers.length > 0 && customers.map(r => (
            <tr key={r.customerID} id={r.customerID}>
              <td align="center">{r.customerID}</td>
              <td>{r.name.toString() + " " + r.surname.toString()}</td>
              <td>{r.address}</td>
              <td>{r.email}</td>
              <td align="center">{r.customerTypeID}</td>
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
