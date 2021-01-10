import React, { Component } from 'react';
import GetData from './getData';
// import { Nav, Navbar, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import LazyHero from 'react-lazy-hero';
import './App.css'

class App extends Component {
  render() {
    return (
      <div box-shadow='100px 100px #000000'>
        <LazyHero imageSrc="https://i.imgur.com/2pIUj46.jpg" minHeight='30vh' opacity='0' parallaxOffset='100'>
          <div style={{background: "#E8E9C9", fontSize: "20px", padding: "10px", margin: "10px", transform: "rotate(-6deg)", borderRadius: "5px"}}>
            <h1 style={{color: "#3E3E3C"}}>The r/WallStreetBets Weekly Stock Portfolio</h1>
            <h4><a href="https://github.com/nikashan02/wsbstockportfolio"><u>github</u></a></h4>
          </div>
        </LazyHero>
        <br></br>
        <div className="App" style={{width: "70%", position: 'absolute', left: '50%', transform: 'translate(-50%, 0%)'}} >
          <GetData />
        </div>
      </div>
    );
  }
}

export default App;