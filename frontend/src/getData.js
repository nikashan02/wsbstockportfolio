import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from './posts.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedditSquare } from '@fortawesome/free-brands-svg-icons';

function format(cell, row, rowIndex, formatExtraData) {
  return (
    <div alignItems= "center" justifyContent="center"><FontAwesomeIcon icon={faRedditSquare} size = '2x'/></div>
  );
}

const columns = [{
  dataField: 'stock',
  text: '',
  formatter: format,
  align: 'center',
  style: {cursor: 'pointer'},
  headerStyle: (column, colIndex) => {
    return { width: '5%' }; 
  }
}, {
  dataField: 'stock',
  text: 'Stock',
  sort: true,
  style: {cursor: 'pointer', verticalAlign: 'middle'}
}, {
  dataField: 'shares',
  text: 'Shares',
  sort: true,
  style: {cursor: 'pointer', verticalAlign: 'middle'}
}, {
  dataField: 'sentiment',
  text: 'Sentiment',
  sort: true,
  style: {cursor: 'pointer', verticalAlign: 'middle'}
}, {
  dataField: 'avg_cost',
  text: 'Average Cost',
  sort: true,
  style: {cursor: 'pointer', verticalAlign: 'middle'}
}, {
  dataField: 'curr_price',
  text: 'Current Price',
  sort: true,
  style: {cursor: 'pointer', verticalAlign: 'middle'}
}, {
  dataField: 'total_return',
  text: 'Total Return',
  sort: true,
  style: (cell, row, rowIndex, colIndex) => {
    if (cell.charAt(0) === '+') {
      return {
        color: '#4CAF50',
        fontWeight: 'bold',
        verticalAlign: 'middle'
      };
    } else if (cell.charAt(0) === '0') {
      return {
        backgroundColor: '#FFFFFF',
        fontWeight: 'bold',
        verticalAlign: 'middle'
      }
    }
    return {
      color: '#EF5350',
      fontWeight: 'bold',
      verticalAlign: 'middle'
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
    const baseURL = process.env.REACT_APP_BASE_URL;
    const api = axios.create({baseURL});
    api.get("/getPosts").then(response => {
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
        wrapperClasses="table-responsive"
        pagination={ paginationFactory() }
        data={ this.state.stocks }
        columns={ columns }
        defaultSorted={ defaultSorted }
        expandRow={ expandRow }
      />
    )
  }
}