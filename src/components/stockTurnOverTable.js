import React, { useState, useEffect } from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import GenerateReportPeriod from './generateReportPeriod';

function StockTurnOverReport(props) {
    const [stockTurnOverReport, setStockTurnOverReport] = useState([]);
    const [p1, setP1] = useState(0);
    const [p2, setP2] = useState(0);
    const [agentsNewRecievedBlanks, setAgentsNewRecievedBlanks] = useState([]);
    const [subAgentNewAssignedBlanks, setSubAgentNewAssignedBlanks] = useState([]);
    const [subAgentAssignedBlanks, setSubAgentAssignedBlanks] = useState([]);
    const [subAgentUsedBlanks, setSubAgentUsedBlanks] = useState([]);
    const [agentsAmounts, setAgentsAmounts] = useState([]);
    const [subAgentsAmounts, setSubAgentsAmounts] = useState([]);
    const [prevCode, setPrevCode] = useState(0);
    const [subNewACode, setSubNewACode] = useState([]);
    const [subACode, setSubACode] = useState([]);
    const [subTotalCode, setSubTotalCode] = useState([]);
    const [periodSet, setPeriodSet] = useState(false);

    useEffect(() => {
        sortData();
    }, [])

    const getStockTurnOverReportData = (start, end) => {
        axios.post('http://localhost:5000/stockTurnOverReport', {start: start, end: end})
        .then(response => {
            console.log(response.data);
            setStockTurnOverReport(response.data);
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    // Creates Arrays where for each pair of value marks a range i.e array[0] is the first number in the range and array[1] is the end of the array
    const sortData = () => {
        setP1(0);
        setP2(0);
        setPrevCode(0);
        if (Array.isArray(stockTurnOverReport) && stockTurnOverReport.length > 0) {
            for (let i = 0; i < stockTurnOverReport.agntNewRBlanks.length; i++) {
                if ((i > 0) && (stockTurnOverReport.agntNewRBlanks[i].blank !== stockTurnOverReport.agntNewRBlanks[p2].blank + 1)){
                    setAgentsNewRecievedBlanks([...agentsNewRecievedBlanks, stockTurnOverReport.agntNewRBlanks[p1].blank, stockTurnOverReport.agntNewRBlanks[p2].blank]);
                    setP1(i);
                    setP2(i);
                } else {
                    setP2(p2 + 1);
                }
            }
            setP1(0);
            setP2(0);
            setPrevCode(0);
            for (let i = 0; i < stockTurnOverReport.subAgntNewABlanks.length; i++) {
                if ((i > 0) && ((stockTurnOverReport.subAgntNewABlanks[i].blank !== stockTurnOverReport.subAgntNewABlanks[p2].blank + 1) || (prevCode != 0) && (stockTurnOverReport.subAgntNewABlanks[i].code !== prevCode))){
                    setSubAgentNewAssignedBlanks([...subAgentNewAssignedBlanks, stockTurnOverReport.subAgntNewABlanks[p1].blank, stockTurnOverReport.subAgntNewABlanks[p2].blank]);
                    setSubNewACode([...subNewACode, prevCode]);
                    setP1(i);
                    setP2(i);
                } else {
                    setP2(p2 + 1);
                    setPrevCode(stockTurnOverReport.subAgntNewABlanks[i].code);
                }
            }
            setP1(0);
            setP2(0);
            setPrevCode(0);
            for (let i = 0; i < stockTurnOverReport.subAgntABlanks.length; i++) {
                if ((i > 0) && ((stockTurnOverReport.subAgntABlanks[i].blank !== stockTurnOverReport.subAgntABlanks[p2].blank + 1) || (prevCode != 0) && (stockTurnOverReport.subAgntABlanks[i].code !== prevCode))){
                    setSubAgentAssignedBlanks([...subAgentAssignedBlanks, stockTurnOverReport.subAgntABlanks[p1].blank, stockTurnOverReport.subAgntABlanks[p2].blank])
                    setSubACode([...subACode, prevCode]);
                    setP1(i);
                    setP2(i);
                } else {
                    setP2(p2 + 1);
                    setPrevCode(stockTurnOverReport.subAgntABlanks[i].code);
                }
            }
            setP1(0);
            setP2(0);
            for (let i = 0; i < stockTurnOverReport.subAgntUBlanks.length; i++) {
                if ((i > 0) && (stockTurnOverReport.subAgntUBlanks[i].blank !== stockTurnOverReport.subAgntUBlanks[p2].blank + 1)){
                    setSubAgentUsedBlanks([...subAgentUsedBlanks, stockTurnOverReport.subAgntUBlanks[p1].blank, stockTurnOverReport.subAgntUBlanks[p2].blank]);
                    setP1(i);
                    setP2(i);
                } else {
                    setP2(p2 + 1);
                }
            }
            setP1(0);
            setP2(0);
            for (let i = 0; i < stockTurnOverReport.agentsAmounts.length; i++) {
                if ((i > 0) && (stockTurnOverReport.agentsAmounts[i].blank !== stockTurnOverReport.agentsAmounts[p2].blank + 1)){
                    setAgentsAmounts([...agentsAmounts, stockTurnOverReport.agentsAmounts[p1].blank, stockTurnOverReport.agentsAmounts[p2].blank]);
                    setP1(i);
                    setP2(i);
                } else {
                    setP2(p2 + 1);
                }
            }
            setP1(0);
            setP2(0);
            setPrevCode(0);
            for (let i = 0; i < stockTurnOverReport.subAgentsAmounts.length; i++) {
                if ((i > 0) && ((stockTurnOverReport.subAgentsAmounts[i].blank !== stockTurnOverReport.subAgentsAmounts[p2].blank + 1) || (prevCode != 0) && (stockTurnOverReport.subAgentsAmounts[i].code !== prevCode))){
                    setSubAgentsAmounts([...subAgentsAmounts, stockTurnOverReport.subAgentsAmounts[p1].blank, stockTurnOverReport.subAgentsAmounts[p2].blank]);
                    setSubTotalCode([...subTotalCode, prevCode]);
                    setP1(i);
                    setP2(i);
                } else {
                    setP2(p2 + 1);
                    setPrevCode(stockTurnOverReport.subAgentsAmounts[i].code);
                }
            }
        }
    }

    // Following on the method above this one, this method adds each cell of the table to an array to be displayed. Ranges in each cell are displayed my adding every two values from the arrays in the same cell.
    const displayData = () => {
        let data = []

        for ( let i = 0;
              i < i < stockTurnOverReport.agntNewRBlanks.length
              || i < stockTurnOverReport.subAgntNewABlanks.length
              || i < stockTurnOverReport.subAgntABlanks.length
              || i < stockTurnOverReport.subAgntUBlanks.length
              || i < stockTurnOverReport.agentsAmounts.length
              || i < stockTurnOverReport.subAgentsAmounts.length; i++) {
            let rows = [];

            for (let j = 0; j < 30; j+2) {
                // Recieved Blanks - Agent's Stock
                if (j < 0 || j >= agentsNewRecievedBlanks.length) {
                    rows.push(
                        <td></td>
                    )
                    rows.push(
                        <td></td>
                    )
                } else {
                    rows.push(
                        <td>{agentsNewRecievedBlanks[j]} - {agentsNewRecievedBlanks[j+1]}</td>
                    )
                    rows.push(
                        <td>{(agentsNewRecievedBlanks[j]-agentsNewRecievedBlanks[j+1]) + 1}</td>
                    )
                }
                // Recieved Blanks - Sub Agents'
                if (j < 0 || j >= subAgentNewAssignedBlanks.length) {
                    rows.push(
                        <td></td>
                    )
                    rows.push(
                        <td></td>
                    )
                    rows.push(
                        <td></td>
                    )
                } else {
                    rows.push(
                        <td>{subNewACode[j/2]}</td>
                    )
                    rows.push(
                        <td>{subAgentNewAssignedBlanks[j]} - {subAgentNewAssignedBlanks[j+1]}</td>
                    )
                    rows.push(
                        <td>{(subAgentNewAssignedBlanks[j]-subAgentNewAssignedBlanks[j+1]) + 1}</td>
                    )
                }
                // Assigned/Used Blanks - Assigned
                if (j < 0 || j >= subAgentAssignedBlanks.length) {
                    rows.push(
                        <td></td>
                    )
                    rows.push(
                        <td></td>
                    )
                    rows.push(
                        <td></td>
                    )
                } else {
                    rows.push(
                        <td>{subACode[j/2]}</td>
                    )
                    rows.push(
                        <td>{subAgentAssignedBlanks[j]} - {subAgentAssignedBlanks[j+1]}</td>
                    )
                    rows.push(
                        <td>{(subAgentAssignedBlanks[j]-subAgentAssignedBlanks[j+1]) + 1}</td>
                    )
                }
                // Assigned/Used Blanks - Used
                if (j < 0 || j >= subAgentUsedBlanks.length) {
                    rows.push(
                        <td></td>
                    )
                    rows.push(
                        <td></td>
                    )
                } else {
                    rows.push(
                        <td>{subAgentUsedBlanks[j]} - {subAgentUsedBlanks[j+1]}</td>
                    )
                    rows.push(
                        <td>{(subAgentUsedBlanks[j]-subAgentUsedBlanks[j+1]) + 1}</td>
                    )
                }
                // Final Amounts - Agent's Amounts
                if (j < 0 || j >= agentsAmounts.length) {
                    rows.push(
                        <td></td>
                    )
                    rows.push(
                        <td></td>
                    )
                } else {
                    rows.push(
                        <td>{agentsAmounts[j]} - {agentsAmounts[j+1]}</td>
                    )
                    rows.push(
                        <td>{(agentsAmounts[j]-agentsAmounts[j+1]) + 1}</td>
                    )
                }
                // Final Amounts - Sub Agents' Amounts
                if (j < 0 || j >= subAgentsAmounts.length) {
                    rows.push(
                        <td></td>
                    )
                    rows.push(
                        <td></td>
                    )
                    rows.push(
                        <td></td>
                    )
                } else {
                    rows.push(
                        <td>{subTotalCode[j/2]}</td>
                    )
                    rows.push(
                        <td>{subAgentsAmounts[j]} - {subAgentsAmounts[j+1]}</td>
                    )
                    rows.push(
                        <td>{(subAgentsAmounts[j]-subAgentsAmounts[j+1]) + 1}</td>
                    )
                }
            }
            data.push(<tr>{rows}</tr>)
        }
        return data;
    }

    const body = () => {
        if (!periodSet) {
            return (
                <GenerateReportPeriod getData={getStockTurnOverReportData} setPeriod={setPeriodSet}/>
            )
        } else {
            return (
                <div id="tablecontainer">
                    <table>
                        <tr>
                            <th colSpan="5">Recieved Blanks</th>
                            <th colSpan="5">Assigned/Used Blanks</th>
                            <th colSpan="5">Final Amounts</th>
                        </tr>
                        <tr>
                            <th colSpan="2">Agent's Stock</th>
                            <th colSpan="3">Sub Agents'</th>
                            <th colSpan="5">Sub Agents'</th>
                            <th colSpan="2">Agent's Amounts</th>
                            <th colSpan="3">Sub Agents' Amounts</th>
                        </tr>
                        <tr>
                            <th>From/To Blanks</th>
                            <th>AMNT</th>
                            <th>Code</th>
                            <th>From/To Blank Numbers</th>
                            <th>AMNT</th>
                            <th>Code</th>
                            <th>Assigned (From/To)</th>
                            <th>AMNT</th>
                            <th>Used (From/To)</th>
                            <th>AMNT</th>
                            <th>From/To</th>
                            <th>AMNT</th>
                            <th>Code</th>
                            <th>From/To</th>
                            <th>AMNT</th>
                        </tr>
                        {displayData()}
                    </table>
                    <button type="button" class="small-button-right">Done</button>
                </div>

            )
        }
    }

    return (
        <body class="indexbody">
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

        <div id="mainmenu">
            <NavLink to="/mainMenu"><button type="button" class="page-button">Stock Turnover Report</button></NavLink>
        </div>
        {body()}
        </body>
    );
}

export default StockTurnOverReport;
