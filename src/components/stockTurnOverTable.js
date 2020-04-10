import React, { useState, useEffect } from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import GenerateReportPeriod from './components/generateReportPeriod';

function StockTurnOverReport(props) {
    const [stockTurnOverReport, SetStockTurnOverReport] = useState('');
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

    useEffect(() => {
        getStockTurnOverReportData();
    }, [])

    useEffect(() => {
        sortData();
    })

    const getStockTurnOverReportData = () => {
        axios.get('http://localhost:5000/stockTurnOverReport')
            .then(response => {
                console.log(response.data);
                SetStockTurnOverReport(response.data);
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
            for (let i = 0; i < stockTurnOverReport.length; i++) {
                if ((i > 0) && ((stockTurnOverReport[i].agntNewRBlanks !== p2 + 1) || (stockTurnOverReport[i].code !== prevCode))){
                    setAgentsNewRecievedBlanks([...agentsNewRecievedBlanks, p1, p2]);
                    setP1(i);
                    setP2(i);
                } else {
                    setP2(p2 + 1);
                    setPrevCode(stockTurnOverReport[i].code);
                }
            }
            setP1(0);
            setP2(0);
            for (let i = 0; i < stockTurnOverReport.length; i++) {
                if ((i > 0) && ((stockTurnOverReport[i].subAgntNewABlanks !== p2 + 1) || (stockTurnOverReport[i].code !== prevCode))){
                    setSubAgentNewAssignedBlanks([...subAgentNewAssignedBlanks, p1, p2]);
                    setSubNewACode([...subNewACode, prevCode]);
                    setP1(i);
                    setP2(i);
                } else {
                    setP2(p2 + 1);
                    setPrevCode(stockTurnOverReport[i].code);
                }
            }
            setP1(0);
            setP2(0);
            for (let i = 0; i < stockTurnOverReport.length; i++) {
                if ((i > 0) && ((stockTurnOverReport[i].subAgntABlanks !== p2 + 1) || (stockTurnOverReport[i].code !== prevCode))){
                    setSubAgentAssignedBlanks([...subAgentAssignedBlanks, p1, p2])
                    setSubACode([...subACode, prevCode]);
                    setP1(i);
                    setP2(i);
                } else {
                    setP2(p2 + 1);
                    setPrevCode(stockTurnOverReport[i].code);
                }
            }
            setP1(0);
            setP2(0);
            for (let i = 0; i < stockTurnOverReport.length; i++) {
                if ((i > 0) && ((stockTurnOverReport[i].subAgntUBlanks !== p2 + 1) || (stockTurnOverReport[i].code !== prevCode))){
                    setSubAgentUsedBlanks([...subAgentUsedBlanks, p1, p2]);
                    setP1(i);
                    setP2(i);
                } else {
                    setP2(p2 + 1);
                    setPrevCode(stockTurnOverReport[i].code);
                }
            }
            setP1(0);
            setP2(0);
            for (let i = 0; i < stockTurnOverReport.length; i++) {
                if ((i > 0) && ((stockTurnOverReport[i].agentsAmounts !== p2 + 1) || (stockTurnOverReport[i].code !== prevCode))){
                    setAgentsAmounts([...agentsAmounts, p1, p2]);
                    setP1(i);
                    setP2(i);
                } else {
                    setP2(p2 + 1);
                    setPrevCode(stockTurnOverReport[i].code);
                }
            }
            setP1(0);
            setP2(0);
            for (let i = 0; i < stockTurnOverReport.length; i++) {
                if ((i > 0) && ((stockTurnOverReport[i].subAgentsAmounts !== p2 + 1) || (stockTurnOverReport[i].code !== prevCode))){
                    setSubAgentsAmounts([...subAgentsAmounts, p1, p2]);
                    setSubTotalCode([...subTotalCode, prevCode]);
                    setP1(i);
                    setP2(i);
                } else {
                    setP2(p2 + 1);
                    setPrevCode(stockTurnOverReport[i].code);
                }
            }
        }
    }

    // Following on the method above this one, this method adds each cell of the table to an array to be displayed. Ranges in each cell are displayed my adding every two values from the arrays in the same cell.
    const displayData = () => {
        let data = []

        for ( let i = 0; i < stockTurnOverReport.length; i++) {
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
                        <td>{subNewACode}</td>
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
                        <td>{subACode}</td>
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
                        <td>{subTotalCode}</td>
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

    return (
        <body class="indexbody">
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

        <div id="mainmenu">
            <NavLink to="/mainMenu"><button type="button" class="page-button">Stock Turnover Report</button></NavLink>
        </div>
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
        </body>
    );
}

export default StockTurnOverReport;