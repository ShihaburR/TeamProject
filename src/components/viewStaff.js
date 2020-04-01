import React, {useState, useEffect} from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function ViewStaff(props) {
  const [staff, setData] = useState('');

  useEffect(() => {
    getStaff();
  }, []);

  const getStaff = () => {
    axios.get('http://localhost:5000/staff')
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  const removeStaff = (id) => {
    axios.post('http://localhost:5000/removeStaff', {
      id : id
    })
      .then(response => {
        alert("Staff Removed");
        getStaff();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  const reActivate = (id) => {
    axios.post('http://localhost:5000/reactivateStaff', {
      id : id
    })
      .then(response => {
        alert("Staff is now Activated");
        getStaff();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return (
    <body class="indexbody">
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
        <div id="mainmenu">
            <button type="button" class="page-button">View Staff</button>
        </div>
        <div id="tablecontainerrefund">
          <table className="striped responsive-table">
            <thead>
              <tr>
                <th>StaffID</th>
                <th>Full Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Agency</th>
                <th>Active?</th>
                <th>Remove</th>
                <th>Re-Activate</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(staff) && staff.length > 0 && staff.map(r => (
              <tr key={r.staffID} id={r.staffID}>
                <td align="center">{r.staffID}</td>
                <td>{r.name.toString() + " " + r.surname.toString()}</td>
                <td>{r.address}</td>
                <td>{r.email}</td>
                <td align="center">{r.agencyID}</td>
                <td align="center">{r.active}</td>
                <td align="center"><button type="button" value={r.staffID}
                 onClick ={() => {removeStaff(r.staffID)}}>Delete</button></td>
                 <td align="center"><button type="button" value={r.staffID}
                  onClick ={() => {reActivate(r.staffID)}}>Re-Activate</button></td>
              </tr>
              ))}
            </tbody>
          </table>
            <button type="button" class="small-button">Add Staff</button>
            <NavLink to="/mainMenu"><button type="button" class="small-button-right" onclick="document.location = '../Menu/MainMenuManager.html'">Done</button></NavLink>
        </div>
    </body>
  );
}

export default ViewStaff;
