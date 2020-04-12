import React, { useState, useEffect } from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import GenerateReportPeriod from './generateReportPeriod';

function DomesticReport(props) {
    const [domesticReport, SetDomesticReport] = useState('');
    const [totalAGNTS, setTotalAGNTS] = useState(0);
    const [ticketsSold, setTicketsSold] = useState(0);
    const [totalFareBaseLocal, setTotalFareBaseLocal] = useState(0);
    const [totalFareBaseUSD, setTotalFareBaseUSD] = useState(0);
    const [totalTax, setTotalTax] = useState(0);
    const [totalCash, setTotalCash] = useState(0);
    const [totalCardUSD, setTotalCardUSD] = useState(0);
    const [totalCardLocal, setTotalCardLocal] = useState(0);
    const [totalAmountPaid, setTotalAmountPaid] = useState(0);
    const [totalCommissionableAmount, setTotalCommissionableAmount] = useState(0);
    const [totalCommissions, setTotalCommssions] = useState(0);
    //const [netAmounts4AgentDebits, setNetAmounts4AgentDebits] = useState(0);
    //const [bankRemittence, setBankRemittence] = useState(0);
    const [periodSet, setPeriodSet] = useState(false);

    const getDomesticReportData = (start, end) => {
        axios.post('http://localhost:5000/domesticReport', {start: start, end: end})
        .then(response => {
            console.log(response.data);
            SetDomesticReport(response.data);
            setSums(response.data);
        })
        .catch(function(error) {
            console.log(error);
        });
      }

    const setSums = (dataArray) => {
        if (Array.isArray(dataArray) && dataArray.length > 0){
            for (let i = 0; i < dataArray.length; i++) {
                setTicketsSold(ticketsSold => ticketsSold + 1);
                setTotalFareBaseLocal(totalFareBaseLocal =>
                  totalFareBaseLocal + dataArray[i].fareBaseLocal);
                setTotalFareBaseUSD(totalFareBaseUSD =>
                   totalFareBaseUSD + dataArray[i].fareBaseUSD);
                setTotalTax(totalTax => totalTax + dataArray[i].tax);
                setTotalCash(totalCash => totalCash + dataArray[i].cash);
                setTotalCardUSD(totalCardUSD => totalCardUSD + dataArray[i].cardUSD);
                setTotalCardLocal(totalCardLocal => totalCardLocal + dataArray[i].cardLocal);
                setTotalAmountPaid(totalAmountPaid => totalAmountPaid + dataArray[i].totalAmountPaid);
                setTotalCommissionableAmount(totalCommissionableAmount =>
                  totalCommissionableAmount + dataArray[i].totalCommissionableAmount);
                setTotalCommssions(totalCommissions => totalCommissions + dataArray[i].commission);
                //setNetAmounts4AgentDebits(totalFareBaseLocal - totalCommissions);
                //setBankRemittence(totalAmountPaid - totalCommissions);
            }
            setTotalAGNTS(dataArray.length);
        }
    }

    const body = () => {
        if (!periodSet) {
            return (
                <GenerateReportPeriod getData={getDomesticReportData} setPeriod={setPeriodSet}/>
            )
        } else {
            return (
                <div id="tablecontainer">
                    <table>
                        <tr>
                            <th>AGNT Number</th>
                            <th>TTL TKT RPRTED NMBR</th>
                            <th>Fare Base (USD)</th>
                            <th>Fare Base (Local)</th>
                            <th>Tax</th>
                            <th>Cash</th>
                            <th>Card (USD)</th>
                            <th>Card (Local)</th>
                            <th>Total Amount Paid</th>
                            <th>Commissionable Amounts</th>
                            <th>Commission</th>
                        </tr>
                        {Array.isArray(domesticReport) && domesticReport.length > 0 && domesticReport.map(r => (
                            <tr key={domesticReport.indexOf(r)} id={domesticReport.indexOf(r)}>
                                <td>{r.agntNumber}</td>
                                <td>{r.ticketsSold}</td>
                                <td>{r.fareBaseUSD}</td>
                                <td>{r.fareBaseLocal}</td>
                                <td>{r.tax}</td>
                                <td>{r.cash}</td>
                                <td>{r.cardUSD}</td>
                                <td>{r.cardLocal}</td>
                                <td>{r.totalAmountPaid}</td>
                                <td>{r.commissionableAmount}</td>
                                <td>{r.commission}</td>
                            </tr>
                        ))}
                    </table>
                    <br/>
                    <table>
                        <th>Total Agents</th>
                        <th>Total Fare Base (Local)</th>
                        <th>Total Fare Base (USD)</th>
                        <th>Total Tax</th>
                        <th>Total Cash</th>
                        <th>Total Card (USD)</th>
                        <th>Total Card (Local)</th>
                        <th>Total of Amount Paid</th>
                        <th>Total Commissionable Amount</th>
                        <th>Total Commission</th>
                        <th>Net Amount's for Agent Debits</th>
                        <th>Bank Remittence</th>
                        <tr>
                            <td>{totalAGNTS}</td>
                            <td>{totalFareBaseLocal}</td>
                            <td>{totalFareBaseUSD}</td>
                            <td>{totalTax}</td>
                            <td>{totalCash}</td>
                            <td>{totalCardUSD}</td>
                            <td>{totalCardLocal}</td>
                            <td>{totalAmountPaid}</td>
                            <td>{totalCommissionableAmount}</td>
                            <td>{totalCommissions}</td>
                            <td>{totalFareBaseLocal - totalCommissions}</td>
                            <td>{totalAmountPaid - totalCommissions}</td>
                        </tr>
                    </table>
                    <button type="button" className="small-button-right">Done</button>
                </div>
            )
        }
    }

    return (
        <body>
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

        <div id="mainmenu">
            <NavLink to="/mainMenu"><button type="button" class="page-button">Domestic Sales Report</button></NavLink>
        </div>
        {body()}
        </body>
    );
}

export default DomesticReport;
