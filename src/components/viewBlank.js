import React from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';

function ViewBlank(props) {
  return (
    <body class="indexbody">

    <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
    
    <div id="mainmenu">
    
        <button type="button" class="page-button">View Refund-Log</button>
    </div>
    
    <div id="tablecontainer">
        <table class="doublelefttable">
            <tr>
                <th>List of Travel Advisors</th>
            </tr>
            <tr>
                <td>test placeholder</td>
            </tr>
            <tr>
                <td>test placeholder</td>
            </tr>
            <tr>
                <td>test placeholder</td>
            </tr>
            <tr>
                <td>test placeholder</td>
            </tr>
        </table>
    
        <table class="doublerighttable">
            <tr>
                <th>List of Blanks</th>
            </tr>
            <tr>
                <td>test placeholder</td>
            </tr>
            <tr>
                <td>test placeholder</td>
            </tr>
            <tr>
                <td>test placeholder</td>
            </tr>
            <tr>
                <td>test placeholder</td>
            </tr>
        </table>
    
        <button type="button" class="small-button">Assign</button>
        <button type="button" class="small-button">Re-assign</button>
        <NavLink to="/mainMenu"><button type="button" class="small-button-right">Done</button></NavLink>
    
    
    </div>
    </body>
  );
}

export default ViewBlank;
