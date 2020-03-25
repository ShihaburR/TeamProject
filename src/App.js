// Import dependencies
import React, {Component} from 'react';
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
import Discount from './components/discount';
import ViewCustomer from './components/viewCustomer';
import SetFrequency from './components/setFrequency';
import MainMenu from './components/mainMenu';
import CardPayment from './components/cardPayment';
import LatePayment from './components/latePayment';
import Payment from './components/payment';
import Refund from './components/refund';
import RefundPayment from './components/refundPayment';
import SellTicket from './components/sellTicket';
import RateNavigator from './components/rateNavigator';
import SetCommissionRate from './components/setCommissionRate';
import SetExchangeRate from './components/setExchangeRate';
import ViewRefund from './components/viewRefund';
import GenerateReportManager from './components/generateReportManager';
import GenerateReportPeriod from './components/generateReportPeriod';
import GenerateReportStaff from './components/generateReportStaff';
import GenerateReportType from './components/generateReportType';
import ViewStaff from './components/viewStaff';
import Login from './components/login';

let paymentAmount = 3000;
let staffName = '', staffID = '', staffType = 1;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        staffName: '',
        staffID: '',
        staffType: 1
    }
  }
    setStaffInfo(param) {
     this.staffType = param[0];
     this.staffName = param[1];
     this.staffID = param[2];
   }

   render() {
     return (
       <div className="App">
           <Router>
             <Switch>
               <Route path="/" component={Login} exact/>
               <Route exact path="/viewBlank">
                 <ViewBlank staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
               </Route>
               <Route exact path="/viewBlankSA">
                 <ViewBlankSA staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
               </Route>
               <Route exact path="/createCustomer">
                 <CreateCustomer staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
               </Route>
               <Route exact path="/discount">
                 <Discount staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
               </Route>
               <Route exact path="/viewCustomer">
                 <ViewCustomer staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
               </Route>
               <Route exact path="/setFrequency">
                 <SetFrequency staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
               </Route>
               <Route exact path="/mainMenu">
                 <MainMenu staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
               </Route>
               <Route exact path="/cardPayment">
                 <CardPayment staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
               </Route>
               <Route exact path="/latePayment">
                 <LatePayment staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
               </Route>
               <Route exact path="/payment">
                 <Payment staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID" paymentAmount={paymentAmount}/>
               </Route>
               <Route exact path="/refund">
                 <Refund staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
               </Route>
               <Route exact path="/refundPayment">
                 <RefundPayment staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
               </Route>
               <Route exact path="/sellTicket">
                 <SellTicket staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
               </Route>
               <Route exact path="/rateNavigator">
                 <RateNavigator staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
               </Route>
               <Route exact path="/setCommissionRate">
                 <SetCommissionRate staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
               </Route>
               <Route exact path="/setExchangeRate">
                 <SetExchangeRate staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
               </Route>
               <Route exact path="/viewRefund">
                 <ViewRefund staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
               </Route>
               <Route exact path="/generateReportManager">
                 <GenerateReportManager staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
               </Route>
               <Route exact path="/generateReportPeriod">
                 <GenerateReportPeriod staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
               </Route>
               <Route exact path="/generateReportStaff">
                 <GenerateReportStaff staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
               </Route>
               <Route exact path="/generateReportType">
                 <GenerateReportType staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
               </Route>
               <Route exact path="/viewStaff">
                 <ViewStaff staffType={staffType} staffName="Placeholder Name" staffID="Placeholder ID"/>
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
}

// Main App function which render the correct page based on the url path

export default App;
