import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from './posts.js';

const columns = [{
  dataField: 'stock',
  text: 'Stock',
  sort: true,
}, {
  dataField: 'shares',
  text: 'Shares',
  sort: true
}, {
  dataField: 'sentiment',
  text: 'Sentiment',
  sort: true
}, {
  dataField: 'avg_cost',
  text: 'Average Cost',
  sort: true
}, {
  dataField: 'curr_price',
  text: 'Current Price',
  sort: true
}, {
  dataField: 'total_return',
  text: 'Total Return',
  sort: true,
  style: (cell, row, rowIndex, colIndex) => {
    if (cell.charAt(0) === '+') {
      return {
        color: '#4CAF50',
        fontWeight: 'bold'
      };
    } else if (cell.charAt(0) === '0') {
      return {
        backgroundColor: '#FFFFFF',
        fontWeight: 'bold'
      }
    }
    return {
      color: '#EF5350',
      fontWeight: 'bold'
    };
  }
},];

const defaultSorted = [{
  dataField: 'shares',
  order: 'desc'
}];

export default class GetData extends Component {
  constructor() {
    super();
    this.state = {
      stocks: [{
        "stock": "",
        "shares": 0,
        "sentiment": 0,
        "avg_cost": "$0",
        "total_return": "0%",
        "curr_price": "",
        "posts": [
            {
                "title": "",
                "upvotes": 0,
                "url": "",
                "created": "",
                "historical": 0
            }
        ]
    }],
      width: 400
    };
  }

  componentDidMount = () => {
    axios.get("/getPosts").then(response => {
      this.setState ({
        stocks: response.data.res.sort((a,b) => a.shares + b.shares).slice(0,30)
      });
    });
  };

  render() {

    const expandRow = {
      renderer: row => (
        <Posts stock={row.stock} listOfTickers={this.state.stocks} />
      )
    };

    return (
      <BootstrapTable
        bootstrap4
        keyField="stock"
        pagination={ paginationFactory() }
        data={ this.state.stocks }
        columns={ columns }
        defaultSorted={ defaultSorted }
        expandRow={ expandRow }
      />
    )
  }
}