import React, { useState, useEffect } from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import GenerateReportPeriod from './components/generateReportPeriod';

function InterlineReport(props) {
    const [interlineReport, setInterlineReport] = useState('');
    const [numOfTickets, setNumOfTickets] = useState(0);
    const [totalUSD, setTotalUSD] = useState(0);
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

    useEffect(() => {
        getInterlineReportData();
    }, [])

    const getInterlineReportData = () => {
        axios.get('http://localhost:5000/interlineReport')
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
                setTotalCash(totalCash + interlineReport.cash);
                setTotalUSD(totalUSD + interlineReport.usd);
                setTotalCardUSD(totalCardUSD + interlineReport.cardUSD);
                setTotalCardLocal(totalCardLocal + interlineReport.cardLocal);
                setTotalCommissionableAmount(totalCommissionableAmount + interlineReport.totalCommissionableAmount);
                setTotalCommissions(totalCommissions + interlineReport.commission);
                setNetAmounts4AgentDebits(totalCommissionableAmount - totalCommissions);
                setBankRemittence(bankRemittence + interlineReport.bankRemittence);
                setTotalLocal(totalLocal + interlineReport.Local);
                setTotalLZ(totalLZ + interlineReport.lz);
                setTotalOTHS(totalOTHS + interlineReport.others);
                setTotalOfDCMNT(totalOfDCMNT + interlineReport.totalDcmntAmount);
                setTotalOfAmounts(totalOfAmounts + interlineReport.totalAmountPaid);
                setTotalOfNonAssessAmounts(totalOfNonAssessAmounts + interlineReport.nonAssessAmounts);
            }
        }
    }

    return (
        <body class="indexbody">
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
        <div id="mainmenu">
            <NavLink to="/mainMenu"><button type="button" class="page-button">Interline Sales Report</button></NavLink>
        </div>
        <div id="tablecontainer">
            <table>
                <tr>
                    <th>Original Issue Number</th>
                    <th>USD</th>
                    <th>USD/Local</th>
                    <th>Local</th>
                    <th>LZ</th>
                    <th>Others</th>
                    <th>Total Documnt's Amount</th>
                    <th>Cash</th>
                    <th>LC</th>
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
                        <td>{r.originalIssueNum}</td>
                        <td>{r.usd}</td>
                        <td>{r.usdLocal}</td>
                        <td>{r.Local}</td>
                        <td>{r.lz}</td>
                        <td>{r.others}</td>
                        <td>{r.totalDcmntAmount}</td>
                        <td>{r.cash}</td>
                        <td>{r.lc}</td>
                        <td>{r.fullCCNum}</td>
                        <td>{r.cardUSD}</td>
                        <td>{r.cardLocal}</td>
                        <td>{r.totalAmountPaid}</td>
                        <td>{r.commissionableAmount}</td>
                        <td>{r.commission}</td>
                        <td>{r.nonAssessAmounts}</td>
                    </tr>
                ))}
            </table>
            <br />
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
                    <td>{totalUSD}</td>
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
            <br />
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
            <button type="button" class="small-button-right">Done</button>
        </div>
        </body>
    );
}

export default InterlineReport;