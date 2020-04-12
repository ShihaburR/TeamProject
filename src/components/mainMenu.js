import React from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function checkPayments() {}

function checkPayments() {
  axios.get('http://localhost:5000/alertLatePayment')
  .then(response => {
    if(response.status === 200){
      console.log("No late payments");
    }
  })
  .catch(error => {
    console.log(error);
    if(error.response.status === 401){
      alert("A late payment has been found in the database");
    }
  });
}

function backupSystem() {
  axios.get('http://localhost:5000/backup')
  .then(response => {
    if(response.status === 200){
      alert("Backup has been created successfully");
    }
  })
  .catch(error => {
    console.log(error);
  });
}

function AdminMenu() {
    return (
      <body class="indexbody">
        <div>
            <div id="mainmenu">
                <button type="button" class="page-button">Main Menu</button>
            </div>
            <div id="menubox">
              <ul>
                  <li><NavLink to="/viewStaff"><button type="button" class="menu-button">View Staff</button></NavLink></li>
                  <li><NavLink to="/setFrequency"><button type="button" class="menu-button">Set Frequency</button></NavLink></li>
                  <li><NavLink to="/viewBlankSA"><button type="button" class="menu-button">View Blank Stock</button></NavLink></li>
              </ul>
              <ul>
                  <li><button type="button" class="menu-button" onClick={backupSystem}>Backup System</button></li>
                  <li><NavLink to="/restoreSystem"><button type="button" class="menu-button">Restore System</button></NavLink></li>
                  <li><NavLink to='/stockTurnOverReport'> <button type="button" class="menu-button">Generate Stock-Turnover Report</button></NavLink></li>
              </ul>
            </div>
        </div>
      </body>
    )
}

function AdvisorMenu() {
    return (
      <body class="indexbody">
        <div>
            <div id="mainmenu">
                <button type="button" class="page-button">Main Menu</button>
            </div>
            <div id="menubox">
              <ul>
                  <li><NavLink to="/sellTicket"><button type="button" class="menu-button">Sell Tickets</button></NavLink></li>
                  <li><NavLink to="/createCustomer"><button type="button" class="menu-button">Create Customer</button></NavLink></li>
                  <li><NavLink to="/generateReportType"><button type="button" class="menu-button">Generate Report</button></NavLink></li>
              </ul>
              <ul>
                  <li><NavLink to="/refund"><button type="button" class="menu-button">Refund Ticket</button></NavLink></li>
                  <li><NavLink to="/latePayment"><button type="button" class="menu-button">Late Payment</button></NavLink></li>
                  <li><NavLink to="/setExchangeRate"><button type="button" class="menu-button">Set Rates</button></NavLink></li>
              </ul>
            </div>
        </div>
      </body>
    )
}

function ManagerMenu() {
    return (
      <body class="indexbody">
        <div>
          <div id="mainmenu">
              <button type="button" class="page-button">Main Menu</button>
          </div>
          <div id="menubox">
            <ul>
                <li><NavLink to="/viewRefund"><button type="button" class="menu-button">View Refund-Log</button></NavLink></li>
                <li><NavLink to="/viewBlank"><button type="button" class="menu-button">View Blank Stock</button></NavLink></li>
                <li><NavLink to="/viewCustomer"><button type="button" class="menu-button">View Customers</button></NavLink></li>
            </ul>
            <ul>
                <li><NavLink to="/rateNavigator"><button type="button" class="menu-button">Set Rates</button></NavLink></li>
                <li><NavLink to="/generateReportManager"><button type="button" class="menu-button">Generate Reports</button></NavLink></li>
                <li><NavLink to="/viewLatePayment"><button type="button" class="menu-button">View Late Payments</button></NavLink></li>
            </ul>
          </div>
        </div>
      </body>
    )
}

function MainMenu(props) {

    switch (props.staffType) {
        case "Advisor":
            return (
                <body class="indexbody">
                    <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
                    <AdvisorMenu />
                </body>
                );

        case "Admin":
            return (
                <body class="indexbody">
                    <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
                    <AdminMenu />
                </body>
                );

        case "Office Manager":
        checkPayments();
            return (
                <body class="indexbody">
                    <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
                    <ManagerMenu />
                </body>
                );
        default:
            return (
                <h1 class="indexbody" align="center">ERROR, NO STAFFTYPE FOUND</h1>
            )

    }
}


export default MainMenu;
