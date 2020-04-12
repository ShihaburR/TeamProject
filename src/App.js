// Import dependencies
import React, {useState} from 'react';
import './App.css';
import './index.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// Import pages and components
import ViewBlank from './components/viewBlank';
import ViewBlankSA from './components/viewBlankSA';
import CreateCustomer from './components/createCustomer';
import ViewCustomer from './components/viewCustomer';
import SetFrequency from './components/setFrequency';
import MainMenu from './components/mainMenu';
import LatePayment from './components/latePayment';
import Refund from './components/refund';
import SellTicket from './components/sellTicket';
import RateNavigator from './components/rateNavigator';
import SetCommissionRate from './components/Commissions';
import SetExchangeRate from './components/ExchangeRates';
import ViewRefund from './components/viewRefund';
import GenerateReportManager from './components/generateReportManager';
import GenerateReportStaff from './components/generateReportStaff';
import GenerateReportType from './components/generateReportType';
import ViewStaff from './components/viewStaff';
import Login from './components/login';
import ViewLatePayment from './components/viewLatePayment';
import AdvisorReport from './components/advisorReport';
import IndividualReport from "./components/individualReport";
import InterlineReport from "./components/interlineReport";
import StockTurnOverReport from "./components/stockTurnOverTable";
import DomesticReport from "./components/domesticReport";
import RestoreSystem from "./components/restoreSystem";


// The main App component which determines what is being rendered.
// No props are being passed into this component so there's no need to pass in a props param.
function App() {
  // This useState hook takes in an array of 2, the first value being the state and the second being the function used to change the value of the state, the useState() function sets the state and passes the states initial value.
  let [staffName, setStaffName] = useState('');
  let [staffID, setStaffID] = useState('');
  let [staffType, setStaffType] = useState('');
  let [staffData, setData] = useState('');

  // This is a the callback function used to retrieve the staffInfo Array which contains the staff information displayed on the top of every page.
  const getStaffInfo = (data) => {
    setData(data);
    setStaffType(data[0]);
    setStaffID(data[2]);
    setStaffName(data[1]);
  }

  return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Login getStaffInfo={getStaffInfo}/>
            </Route>
            <Route exact path="/viewBlank">
              <ViewBlank staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/viewBlankSA">
              <ViewBlankSA staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/createCustomer">
              <CreateCustomer staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/viewCustomer">
              <ViewCustomer staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/setFrequency">
              <SetFrequency staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/mainMenu">
              <MainMenu staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/latePayment">
              <LatePayment staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/refund">
              <Refund staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/sellTicket">
              <SellTicket staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/rateNavigator">
              <RateNavigator staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/setCommissionRate">
              <SetCommissionRate staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/setExchangeRate">
              <SetExchangeRate staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/viewRefund">
              <ViewRefund staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/generateReportManager">
              <GenerateReportManager staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/generateReportStaff">
              <GenerateReportStaff staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/generateReportType">
              <GenerateReportType staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/viewStaff">
              <ViewStaff staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/advisorReport">
              <AdvisorReport staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/domesticReport">
              <DomesticReport staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/individualReport">
              <IndividualReport staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/interlineReport">
              <InterlineReport staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/stockTurnOverReport">
              <StockTurnOverReport staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/viewLatePayment">
              <ViewLatePayment staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/restoreSystem">
              <RestoreSystem staffType={staffType} staffName={staffName} staffID={staffID}/>
            </Route>
            <Route exact path="/404">
              <h1>PAGE DOES NOT EXIST</h1>
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
  )
}

// Exporting this component so the index.js can render it.
export default App;
