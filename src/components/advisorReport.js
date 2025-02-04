import React, { useState, useEffect } from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import GenerateReportPeriod from './generateReportPeriod';

function AdvisorReport(props) {
    const [advisorReport, SetAdvisorReport] = useState('');
    const [totalAgents, setTotalAgents] = useState(0);
    const [totalFareAmount, setTotalFareAmount] = useState(0);
    const [totalLZ, setTotalLZ] = useState(0);
    const [totalOTHS, setTotalOTHS] = useState(0);
    const [totalTTLDcmntAmount, setTotalTTLDcmntAmount] = useState(0);
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

    const getAdvisorReportData = (start, end) => {
        var stop = 0;
        axios.post('http://localhost:5000/advisorReport', {start: start, end: end})
        .then(response => {
          console.log("hello");
            SetAdvisorReport(response.data);
            console.log(response.data);
            sortSums(response.data);
        })
        .catch(function(error) {
            console.log(error);
        });
      }

    const sortSums = (dataArray) => {
        if (Array.isArray(dataArray) && dataArray.length > 0){
            for (let i = 0; i < dataArray.length; i++) {
                setTotalFareAmount(totalFareAmount => totalFareAmount + dataArray[i].fareAmount);
                setTotalLZ(totalLZ => totalLZ + dataArray[i].lz);
                setTotalOTHS(totalOTHS => totalOTHS + dataArray[i].oths);
                setTotalTTLDcmntAmount(totalTTLDcmntAmount =>
                  totalTTLDcmntAmount + dataArray[i].totalDocumentAmount);
                setTotalCash(totalCash => totalCash + dataArray[i].cash);
                setTotalCardUSD(totalCardUSD => totalCardUSD + dataArray[i].cardUSD);
                setTotalCardLocal(totalCardLocal => totalCardLocal + dataArray[i].cardLocal);
                setTotalOfAmountPaid(totalOfAmountPaid => totalOfAmountPaid + dataArray[i].totalAmountPaid);
                setTotalCommissionableAmount(totalCommissionableAmount =>
                  totalCommissionableAmount + dataArray[i].commissionableAmount);
                setTotalCommission(totalCommission => totalCommission + dataArray[i].commission);
                //setNetAmount4AgentsDebits(totalCommissionableAmount - totalCommission);
                //setBankRemittence(totalOfAmountPaid - totalCommission);
            }
            setTotalAgents(dataArray.length);
        }
    }


    const body = () => {
        if (!periodSet) {
            return (
                <GenerateReportPeriod getData={getAdvisorReportData} setPeriod={setPeriodSet}/>
            )
        } else if(periodSet) {
          console.log("The data: " + advisorReport);
            return (
                <div id="tablecontainerrefund">
                    <table className="striped responsive-table">
                        <thead>
                            <th>Advisor Number</th>
                            <th>DOC NMBRS ACPNS</th>
                            <th>Fare Amount</th>
                            <th>LZ</th>
                            <th>OTHS</th>
                            <th>Total Document's Amount</th>
                            <th>Cash</th>
                            <th>Card (USD)</th>
                            <th>Card (Local)</th>
                            <th>Total Amount Paid</th>
                            <th>Commissionable Amounts</th>
                            <th>Commission</th>
                            <th>Non Assessable Amounts</th>
                        </thead>
                        <tbody>
                        {advisorReport.length > 0 && advisorReport.map(r => (
                            <tr key={r.advisorNum} id={r.advisorNum}>
                                <td>{r.advisorNum}</td>
                                <td>{r.docNumACPNS}</td>
                                <td>{r.fareAmount}</td>
                                <td>{r.lz}</td>
                                <td>{r.oths}</td>
                                <td>{r.totalDocumentAmount}</td>
                                <td>{r.cash}</td>
                                <td>{r.cardUSD}</td>
                                <td>{r.cardLocal}</td>
                                <td>{r.totalAmountPaid}</td>
                                <td>{r.commissionableAmount}</td>
                                <td>{r.commission}</td>
                                <td>{r.nonAssessableAmounts}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <br/>
                    <table>
                        <th>Total Agents</th>
                        <th>Total Fare Amount</th>
                        <th>Total LZ</th>
                        <th>Total OTHS</th>
                        <th>Total TTL Document's Amount</th>
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
                            <td>{totalFareAmount}</td>
                            <td>{totalLZ}</td>
                            <td>{totalOTHS}</td>
                            <td>{totalTTLDcmntAmount}</td>
                            <td>{totalCash}</td>
                            <td>{totalCardUSD}</td>
                            <td>{totalCardLocal}</td>
                            <td>{totalOfAmountPaid}</td>
                            <td>{totalCommissionableAmount}</td>
                            <td>{totalCommission}</td>
                            <td>{totalNonAssessableAmount}</td>
                            <td>{totalCommissionableAmount - totalCommission}</td>
                            <td>{totalOfAmountPaid - totalCommission}</td>
                        </tr>
                    </table>
                    <button type="button" className="small-button-right">Done</button>
                </div>
            );
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
