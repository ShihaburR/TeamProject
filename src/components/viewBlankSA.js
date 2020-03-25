import React from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';

function ViewBlankSA(props) {
  return (
<body class="indexbody">

<Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

<div id="mainmenu">

    <button type="button" class="page-button">View Blank Stock</button>

</div>

<div id="tablecontainerrefund">
    <table align="center">
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
    <button type="button" class="small-button">Add Blanks</button>
    <button type="button" class="small-button">Return Unused</button>
    <button type="button" class="small-button">Edit Blanks</button>

    <NavLink to="/mainMenu"><button type="button" class="small-button-right">Done</button></NavLink>


</div>
</body>
  );
}

export default ViewBlankSA;