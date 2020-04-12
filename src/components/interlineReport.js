import React, { useState, useEffect } from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import GenerateReportPeriod from './generateReportPeriod';

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
        axios.post('http://localhost:5000/interlineReport', {
          start: start,
          end: end
        })
        .then(response => {
            console.log(response.data);
            setInterlineReport(response.data);
            setSums(response.data);
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    const setSums = (dataArray) => {
        if (Array.isArray(dataArray) && dataArray.length > 0) {
            for (let i = 0; i < dataArray.length; i++) {
                setTotalCash(totalCash => totalCash + dataArray[i].cash);
                setTotalAmountUSD(totalAmountUSD => totalAmountUSD + dataArray[i].amountUSD);
                setTotalCardUSD(totalCardUSD => totalCardUSD + dataArray[i].usd);
                setTotalCardLocal(totalCardLocal => totalCardLocal + dataArray[i].bgl);
                setTotalCommissionableAmount(totalCommissionableAmount =>
                  totalCommissionableAmount + dataArray[i].commissionable);
                setTotalCommissions(totalCommissions => totalCommissions
                  + (dataArray[i].commissionable * dataArray[i].commissionRate/100));
                //setNetAmounts4AgentDebits(totalCommissionableAmount - totalCommissions);
                //setBankRemittence(totalOfAmounts - totalCommissions);
                setTotalLocal(totalLocal => totalLocal + dataArray[i].amount);
                setTotalLZ(totalLZ => totalLZ + dataArray[i].localTax);
                setTotalOTHS(totalOTHS => totalOTHS + dataArray[i].otherTax);
                setTotalOfDCMNT(totalOfDCMNT => totalOfDCMNT + dataArray[i].totalDocumentAmount);
                setTotalOfAmounts(totalOfAmounts => totalOfAmounts + dataArray[i].totalPaidAmount);
                setTotalOfNonAssessAmounts(totalOfNonAssessAmounts =>
                   totalOfNonAssessAmounts + dataArray[i].nonAssessAmounts);
            }
            setNumOfTickets(dataArray.length);
        }
    }

    const body = () => {
        if (!periodSet) {
            return (
                <GenerateReportPeriod getData={getInterlineReportData} setPeriod={setPeriodSet}/>
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
                            <td>{totalCommissionableAmount - totalCommissions}</td>
                            <td>{totalOfAmounts - totalCommissions}</td>
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
