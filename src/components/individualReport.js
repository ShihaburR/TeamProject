import React, { useState, useEffect } from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import GenerateReportPeriod from './generateReportPeriod';

function IndividualReport(props) {
    const [individualReport, SetIndividualReport] = useState([]);
    const [numOfTickets, setNumOfTickets] = useState(0);
    const [totalFareBaseLocal, setTotalFareBaseLocal] = useState(0);
    const [totalFareBaseUSD, setTotalFareBaseUSD] = useState(0);
    const [totalTax, setTotalTax] = useState(0);
    const [totalCash, setTotalCash] = useState(0);
    const [totalCardUSD, setTotalCardUSD] = useState(0);
    const [totalCardLocal, setTotalCardLocal] = useState(0);
    const [totalAmountPaid, setTotalAmountPaid] = useState(0);
    const [totalCommissionableAmount, setTotalCommissionableAmount] = useState(0);
    const [totalCommissions, setTotalCommissions] = useState(0);
    const [netAmounts4AgentDebits, setNetAmounts4AgentDebits] = useState(0);
    const [bankRemittence, setBankRemittence] = useState(0);
    const [periodSet, setPeriodSet] = useState(false);

    const getIndividualReportData = (start, end) => {

        axios.post('http://localhost:5000/individualReport', {start: start, end: end})
            .then(response => {
              if(response.status === 200){
                console.log(response.data);
                SetIndividualReport(response.data);
              }
            })
            .catch(function(error) {
                    console.log(error);
                }
            );
    }

    const setSums = () => {
        if (Array.isArray(individualReport) && individualReport.length > 0) {
            for (let i = 0; i < individualReport.length; i++) {
                setNumOfTickets(numOfTickets + 1);
                setTotalFareBaseLocal(totalFareBaseLocal + individualReport.amount);
                setTotalFareBaseUSD(totalFareBaseUSD + individualReport.amountUSD);
                setTotalTax(totalTax + individualReport.localTax);
                setTotalCash(totalCash + individualReport.cash);
                setTotalCardUSD(totalCardUSD + individualReport.usd);
                setTotalCardLocal(totalCardLocal + individualReport.bgl);
                setTotalAmountPaid(totalAmountPaid + individualReport.totalAmountPaid);
                setTotalCommissionableAmount(totalCommissionableAmount + individualReport.commissionable);
                setTotalCommissions(totalCommissions + (individualReport.commissionable * individualReport.commissionRate/100));
                setNetAmounts4AgentDebits(totalCommissionableAmount - totalCommissions);
                setBankRemittence(totalAmountPaid - totalCommissions);
            }
        }
    }

    const body = () => {
        if (!periodSet) {
            return (
                <GenerateReportPeriod getData={getIndividualReportData} setPeriod={setPeriodSet}/>

            )
        } else {
            return (
                <div id="tablecontainer">
                    <table>
                        <tr>
                            <th>Original Issue Number</th>
                            <th>Fare Base (Local)</th>
                            <th>Fare Base (USD)</th>
                            <th>Cash (Local)</th>
                            <th>Credit Card (USD)</th>
                            <th>Credit Card (Local)</th>
                            <th>Tax</th>
                            <th>Total Amount Paid</th>
                            <th>Commissionable Amount</th>
                            <th>Commission</th>
                        </tr>
                        {Array.isArray(individualReport) && individualReport.length > 0 && individualReport.map(r => (
                            <tr key={individualReport.indexOf(r)} id={individualReport.indexOf(r)}>
                                <td>{r.saleID}</td>
                                <td>{r.amount}</td>
                                <td>{r.amountUSD}</td>
                                <td>{r.cash}</td>
                                <td>{r.usd}</td>
                                <td>{r.bgl}</td>
                                <td>{r.localTax}</td>
                                <td>{r.totalAmountPaid}</td>
                                <td>{r.commissionable}</td>
                                <td>{r.commissionRate}</td>
                            </tr>
                        ))}
                    </table>
                    <br/>
                    <table>
                        <th>Number of tickets</th>
                        <th>Total Fare Base (Local)</th>
                        <th>Total Fare Base (USD)</th>
                        <th>Total Cash (Local)</th>
                        <th>Total Card (Local)</th>
                        <th>Total Card (USD)</th>
                        <th>Total Taxes</th>
                        <th>Total of Amounts Paid</th>
                        <th>Total Commissionable Amount</th>
                        <th>Total Commission</th>
                        <th>Net Amount for Agent Debit</th>
                        <th>Bank Remittence</th>
                        {setSums()}
                        <tr>
                            <td>{numOfTickets}</td>
                            <td>{totalFareBaseLocal}</td>
                            <td>{totalFareBaseUSD}</td>
                            <td>{totalCash}</td>
                            <td>{totalCardLocal}</td>
                            <td>{totalCardUSD}</td>
                            <td>{totalTax}</td>
                            <td>{totalAmountPaid}</td>
                            <td>{totalCommissionableAmount}</td>
                            <td>{totalCommissions}</td>
                            <td>{netAmounts4AgentDebits}</td>
                            <td>{bankRemittence}</td>
                        </tr>
                    </table>
                    <button type="button" className="small-button-right">Done</button>
                </div>
            )
        }
    }

    return (
        <body class="indexbody">
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

        <div id="mainmenu">
            <NavLink to="/mainMenu"><button type="button" class="page-button">Individual Sales Report</button></NavLink>
        </div>
        {body()}
        </body>
    );
}

export default IndividualReport;
