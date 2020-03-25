import React from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';

function ViewStaff(props) {
    const staff = ['bob', 'sam', 'tom', 'alice'];

    const handleClick = (staffName) => {
        console.log(staffName);
    } 

    const listItems = staff.map((staffName) => 
        <tr>
            <td onClick={handleClick(staffName)}>{staffName}</td>
        </tr>
    )

  return (
    <body class="indexbody">

        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>

        <div id="mainmenu">

            <button type="button" class="page-button">View Staff</button>

        </div>

        <div id="tablecontainerrefund">
            <table align="center">
                <tr>
                    <th>List of Staff</th>
                </tr>
                {listItems}

            </table>
            <button type="button" class="small-button">Add Staff</button>
            <button type="button" class="small-button">Remove Staff</button>
            <button type="button" class="small-button">Edit Advisor</button>

            <NavLink to="/mainMenu"><button type="button" class="small-button-right">Done</button></NavLink>

        </div>
    </body>
  );
}

export default ViewStaff;