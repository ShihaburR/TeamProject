import React, { useState, useEffect } from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import GenerateReportPeriod from './components/generateReportPeriod';

function InterlineReport(props) {
    const [interlineReport, setInterlineReport] = useState('');
    const [numOfTickets, setNumOfTickets] = useState(0);
    const [totalAmountUSD, setTotalAmountUSD] = useState(0);
    const [totalLocal, setTotalLocal] = useState(0);
    const [totalLZ, setTotalLZ] = useState(0);
    const [totalOTHS, setTotalOTHS] = useState(0);
    const [totalOfDCMNT, setTotalOfDCMNT] = useState(0);
    const [totalCash, setTotalCash] = useState(0);
    const [totalCardUSD, setTotalCardUSD] = useState(0);
    const [totalCardLocal, setTotalCardLocal] = useState(0);
    const [totalOfAmounts, setTotalOfAmounts] = useState(0);
    const [totalOfNonAssessAmounts, setTotalOfNonAssessAmounts] = useState(0);
    const [totalCommissionableAmount, setTotalCommissionableAmount] = useState(0);
    const [totalCommissions, setTotalCommissions] = useState(0);
    const [netAmouts4AgentDebits, setNetAmounts4AgentDebits] = useState(0);
    const [bankRemittence, setBankRemittence] = useState(0);
    const [periodSet, setPeriodSet] = useState(false);


    const getInterlineReportData = (start, end) => {
        axios.get('http://localhost:5000/interlineReport', {params: {start: start, end: end}})
            .then(response => {
                console.log(response.data);
                setInterlineReport(response.data);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    const sortSums = () => {
        if (Array.isArray(interlineReport) && interlineReport.length > 0) {
            for (let i = 0; i < interlineReport.length; i++) {
                setNumOfTickets(numOfTickets + 1);
                setTotalCash(totalCash + interlineReport[i].cash);
                setTotalAmountUSD(totalAmountUSD + interlineReport[i].amountUSD);
                setTotalCardUSD(totalCardUSD + interlineReport[i].usd);
                setTotalCardLocal(totalCardLocal + interlineReport[i].bgl);
                setTotalCommissionableAmount(totalCommissionableAmount + interlineReport[i].commissionable);
                setTotalCommissions(totalCommissions + (interlineReport[i].commission * interlineReport[i].commissionRate/100));
                setNetAmounts4AgentDebits(totalCommissionableAmount - totalCommissions);
                setBankRemittence(totalOfAmounts - totalCommissions);
                setTotalLocal(totalLocal + interlineReport[i].amount);
                setTotalLZ(totalLZ + interlineReport[i].localTax);
                setTotalOTHS(totalOTHS + interlineReport[i].otherTax);
                setTotalOfDCMNT(totalOfDCMNT + interlineReport[i].totalDocumentAmount);
                setTotalOfAmounts(totalOfAmounts + interlineReport[i].totalPaidAmount);
                setTotalOfNonAssessAmounts(totalOfNonAssessAmounts + interlineReport[i].nonAssessAmounts);
            }
        }
    }

    const body = () => {
        if (!periodSet) {
            return (
                <GenerateReportPeriod getData={getInterlineReportData()} setPeriod={setPeriodSet}/>
            )
        } else {
            return (
                <div id="tablecontainer">
                    <table>
                        <tr>
                            <th>Original Issue Number</th>
                            <th>USD</th>
                            <th>USD/Local</th>
                            <th>Local</th>
                            <th>LZ</th>
                            <th>Others</th>
                            <th>Total Document's Amount</th>
                            <th>Cash</th>
                            <th>Full CC Number</th>
                            <th>Card - USD</th>
                            <th>Card - Local</th>
                            <th>Total Amounts Paid</th>
                            <th>Commissionable Amounts</th>
                            <th>Commission</th>
                            <th>Non Assess Amounts</th>
                        </tr>
                        {Array.isArray(interlineReport) && interlineReport.length > 0 && interlineReport.map(r => (
                            <tr key={interlineReport.indexOf(r)} id={interlineReport.indexOf(r)}>
                                <td>{r.saleID}</td>
                                <td>{r.amountUSD}</td>
                                <td>{r.exchangeRate}</td>
                                <td>{r.amount}</td>
                                <td>{r.localTax}</td>
                                <td>{r.otherTax}</td>
                                <td>{r.totalDocumentAmount}</td>
                                <td>{r.cash}</td>
                                <td>{r.cc}</td>
                                <td>{r.usd}</td>
                                <td>{r.bgl}</td>
                                <td>{r.totalPaidAmount}</td>
                                <td>{r.commissionable}</td>
                                <td>{r.commissionRate}</td>
                                <td>{r.nonAssessAmounts}</td>
                            </tr>
                        ))}
                    </table>
                    <br/>
                    {sortSums()}
                    <table>
                        <th>NBR of TKTS</th>
                        <th>Total USD</th>
                        <th>Total Local</th>
                        <th>Total LZ</th>
                        <th>Total OTHS</th>
                        <th>Total of DCMNT</th>
                        <th>Total Cash</th>
                        <th>Total Card - USD</th>
                        <th>Total Card - Local</th>
                        <th>Total of AMNTS</th>
                        <th>Total of Non Assess Amounts</th>

                        <tr>
                            <td>{numOfTickets}</td>
                            <td>{totalAmountUSD}</td>
                            <td>{totalLocal}</td>
                            <td>{totalLZ}</td>
                            <td>{totalOTHS}</td>
                            <td>{totalOfDCMNT}</td>
                            <td>{totalCash}</td>
                            <td>{totalCardUSD}</td>
                            <td>{totalCardLocal}</td>
                            <td>{totalOfAmounts}</td>
                            <td>{totalOfNonAssessAmounts}</td>
                        </tr>
                    </table>
                    <br/>
                    <table>
                        <th>Total Commissionable Amount</th>
                        <th>Total Commission</th>
                        <th>Net Amount's for Agent Debits</th>
                        <th>Bank Remittence</th>

                        <tr>
                            <td>{totalCommissionableAmount}</td>
                            <td>{totalCommissions}</td>
                            <td>{netAmouts4AgentDebits}</td>
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
            <NavLink to="/mainMenu"><button type="button" class="page-button">Interline Sales Report</button></NavLink>
        </div>
        {body()}
        </body>
    );
}

export default InterlineReport;