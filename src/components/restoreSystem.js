import React, { useState, useEffect } from 'react';
import Header from './header';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';

function RestoreSystem(props) {
  const [filename, setFilename] = useState('');
  const [files, setFiles] = useState('');
  const [nobackup, setNoBackup] = useState(false);

  const getFiles = () => {
    axios.get('http://localhost:5000/files')
    .then(response => {
        if(response.status === 200){
          console.log(response.data);
          setFiles(response.data);
        }
    })
    .catch(error => {
      console.log(error);
      if(error.response.status === 401){
        setNoBackup(true);
        alert("There are no backups found, please add a backup before restoring");
      }
    })
  }

  const restore = () => {
    alert("Restoring System, Please Wait");
    axios.post('http://localhost:5000/restore', {
      filename : filename
    })
    .then(response => {
      if(response.status === 200){
        alert("System has been restored successfully");
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    getFiles();
  },[])

  return (
    <body class ="indexbody">
    {nobackup && <Redirect to="/mainMenu"/>}
        <Header staffType={props.staffType} staffName={props.staffName} staffID={props.staffID}/>
        <div id="mainmenu">
            <button type="button" class="page-button">Restore System</button>
        </div>
        <div id="menubox" class="mainSize" align="center">
        <br/><br/><br/><br/>
        <label>Restore File:
          <select value={filename} onChange={(e) => setFilename(e.target.value)}>
            <option value="0">"Select a file for Restore (YYYY-MM-DD_HH_MM_SS)"</option>
            {files.length > 0 && files.map(r => (
              <option key={r.filename} value={r.filename}>
              {r.filename}
              </option>
            ))}
          </select>
        </label>
        <br/><br/>
        <button type="button" class="small-button" onClick={restore}>Begin Restore</button>
        <NavLink to="/mainMenu"><button type="button" class="small-button">Cancel</button></NavLink>
        </div>
    </body>
  );
}
export default RestoreSystem
