import React, { useState, useEffect } from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import GenerateReportPeriod from './components/generateReportPeriod';

function AdvisorReport(props) {
    const [advisorReport, SetAdvisorReport] = useState('');
    const [totalAgents, setTotalAgents] = useState(0);
    const [totalFareBaseLocal, setTotalFareBaseLocal] = useState(0);
    const [totalFareBaseUSD, setTotalFareBaseUSD] = useState(0);
    const [totalTax, setTotalTax] = useState(0);
    const [totalCash, setTotalCash] = useState(0);
    const [totalCardUSD, setTotalCardUSD] = useState(0);
    const [totalCardLocal, setTotalCardLocal] = useState(0);
    const [totalOfAmountPaid, setTotalOfAmountPaid] = useState(0);
    const [totalCommissionableAmount, setTotalCommissionableAmount] = useState(0);
    const [totalCommission, setTotalCommission] = useState(0);
    const [totalNonAssessableAmount, setTotalNonAssessableAmount] = useState(0);
    const [netAmounts4AgentDebits, setNetAmount4AgentsDebits] = useState(0);
    const [bankRemittence, setBankRemittence] = useState(0);
    const [periodSet, setPeriodSet] = useState(false);

    const getAdvisorReportData = () => {
        axios.get('http://localhost:5000/AdvisorReport')
            .then(response => {
                console.log(response.data);
                SetAdvisorReport(response.data);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    const sortSums = () => {
        if (Array.isArray(advisorReport) && advisorReport.length > 0){
            for (let i = 0; i < advisorReport.length; i++) {
                setTotalAgents(totalAgents + 1);
                setTotalFareBaseLocal(totalFareBaseLocal + advisorReport.fareBaseLocal);
                setTotalFareBaseUSD(totalFareBaseUSD + advisorReport.fareBaseUSD);
                setTotalTax(totalTax + advisorReport.tax);
                setTotalCash(totalCash + advisorReport.cash);
                setTotalCardUSD(totalCardUSD + advisorReport.cardUSD);
                setTotalCardLocal(totalCardLocal + advisorReport.cardLocal);
                setTotalOfAmountPaid(totalOfAmountPaid + advisorReport.totalAmountPaid);
                setTotalCommissionableAmount(totalCommissionableAmount + advisorReport.totalCommissionableAmount);
                setTotalCommission(totalCommission + advisorReport.commission);
                setNetAmount4AgentsDebits(totalCommissionableAmount - totalCommission);
                setBankRemittence(totalOfAmountPaid - totalCommission);
            }
        }
    }


    const body = () => {
        if (!periodSet) {
            return (
                <GenerateReportPeriod getData={getAdvisorReportData()} setPeriod={setPeriodSet}/>
            )
        } else {
            return (
                <div id="tablecontainer">
                    <table>
                        <tr>
                            <th>Advisor Number</th>
                            <th>DOC NMBRS ACPNS</th>
                            <th>Fare Amount (Local)</th>
                            <th>Fare Amount (USD)</th>
                            <th>LZ</th>
                            <th>OTHS</th>
                            <th>Cash</th>
                            <th>Card Number</th>
                            <th>Card (USD)</th>
                            <th>Card (Local)</th>
                            <th>Total Amount Paid</th>
                            <th>Commissionable Amounts</th>
                            <th>Commission</th>
                            <th>Non Assessable Amounts</th>
                        </tr>
                        {Array.isArray(advisorReport) && advisorReport.length > 0 && advisorReport.map(r => (
                            <tr key={advisorReport.indexOf(r)} id={advisorReport.indexOf(r)}>
                                <td>{r.advisorNum}</td>
                                <td>{r.docNumACPNS}</td>
                                <td>{r.fareBaseLocal}</td>
                                <td>{r.fareBaseUSD}</td>
                                <td>{r.lz}</td>
                                <td>{r.oths}</td>
                                <td>{r.cash}</td>
                                <td>{r.cardNum}</td>
                                <td>{r.cardUSD}</td>
                                <td>{r.cardLocal}</td>
                                <td>{r.totalAmountPaid}</td>
                                <td>{r.commissionableAmount}</td>
                                <td>{r.commission}</td>
                                <td>{r.nonAssessableAmounts}</td>
                            </tr>
                        ))}
                    </table>
                    <br/>
                    {sortSums()}
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
                        <th>Total Non Assesable Amount</th>
                        <th>Net Amount's for Agent Debits</th>
                        <th>Bank Remittence</th>

                        <tr>
                            <td>{totalAgents}</td>
                            <td>{totalFareBaseLocal}</td>
                            <td>{totalFareBaseUSD}</td>
                            <td>{totalTax}</td>
                            <td>{totalCash}</td>
                            <td>{totalCardUSD}</td>
                            <td>{totalCardLocal}</td>
                            <td>{totalOfAmountPaid}</td>
                            <td>{totalCommissionableAmount}</td>
                            <td>{totalCommission}</td>
                            <td>{totalNonAssessableAmount}</td>
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
            <button type="button" class="page-button"> By Advisor Report</button>
        </div>
        {body()}
        </body>
    );
}

export default AdvisorReport;