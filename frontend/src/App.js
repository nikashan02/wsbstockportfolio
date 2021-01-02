import React, { Component } from 'react';
import GetData from './getData';
import { Nav, Navbar, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class App extends Component {
  render() {
    return (
      <div>
      
        <br></br>
        <div className="App" style={{width: "70%", position: 'absolute', left: '50%', transform: 'translate(-50%, 0%)'}} >
          <GetData />
        </div>
      </div>
    );
  }
}

export default App;