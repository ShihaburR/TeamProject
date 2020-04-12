import React, {useState, useEffect} from 'react';
import Header from './header';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import searchIcon from './images/search-icon.png';

function ViewStaff(props) {
  const [staff, setData] = useState('');
  const [search, setSearch] = useState("");
  const [addStaff, setAdd] = useState(false);
  const [main, setMain] = useState(true);

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

  const getMainMenu = () => {
    setMain(true);
    setAdd(false);
  }

  const getAddStaff = () => {
    setAdd(true);
    setMain(false);
  }

  const filter = () => {
    axios.post('http://localhost:5000/searchStaff', {
      details : search
    })
    .then(response => {
      console.log(response.data);
      setData(response.data);
      console.log(staff);
    })
    .catch(error => {
      console.log(error);
    });
  }
  if(main) {
    return (
      <body class="indexbody">
          <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
          <div id="mainmenu">
              <button type="button" class="page-button">View Staff</button>
              <br/> <br/>
              <input type="text" value={search} placeholder= "Enter name or id.." class="search_bar"
              required onChange={(e) => setSearch(e.target.value)}/>
              <button type="button" class="search_submit" onClick={() => {filter();}}>
                <img src={searchIcon} alt="Search"  height="17.5" width="16"/>
              </button>
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
              <button type="button" class="small-button" onClick={getAddStaff}>Add Staff</button>
              <button type="button" class="small-button" onClick={getStaff}>Reload Table</button>
              <NavLink to="/mainMenu"><button type="button" class="small-button-right" onclick="document.location = '../Menu/MainMenuManager.html'">Done</button></NavLink>
          </div>
      </body>
    );
  }/* else if(addStaff) {
    return (
      <body class="indexbody">
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
        <div id="mainmenu">
            <button type="button" class="page-button" onClick={handleSubmit}>Create Customer Account</button>
        </div>
        <div id="menubox" class="mainSize">
          <ul>
              <li><label>First Name:</label></li>
              <li><textarea value={firstName} required onChange={(e) => setFirstName(e.target.value)}></textarea></li>
              <li><label>Last Name:</label></li>
              <li><textarea value={lastName} required onChange={(e) => setLastName(e.target.value)}></textarea></li>
          </ul>
          <ul>
              <li><label>Address:</label></li>
              <li><textarea value={address} required onChange={(e) => setAddress(e.target.value)}></textarea></li>
              <li><label>Email:</label></li>
              <li><textarea value={email} required onChange={(e) => setEmail(e.target.value)}></textarea></li>
          </ul>
          <ul>
            <li>
              <label>Customer Type (1 for valued, 2 for non-valued):
              <select value={valued} required onChange={(e) => setValue(e.target.value)}>
                <option value = "0">Select one</option>
                <option value = "1">Valued</option>
                <option value = "2">Non-Valued</option>
                <option value = "3">Casual</option>
              </select>
              </label>
            </li>
          </ul>
        </div>
      </body>
    )*/
  }

export default ViewStaff;
