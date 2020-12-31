import React, { Component } from 'react';
import axios from 'axios';

export default class GetData extends Component {
  constructor() {
    super();
    this.state = {
      data: "Not yet gotten"
    };
  }

  componentDidMount = () => {
    axios.get("/getPosts").then(response => {
      console.log(response.data);
      this.setState ({
        data: response.data
      });
    });
  };

  render() {
    return (
      <div>
        <h1>Data: {this.state.data}</h1>
      </div>
    )
  }
}
