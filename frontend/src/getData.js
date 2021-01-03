import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from './posts.js';

const columns = [{
  dataField: 'stock',
  text: 'Stock',
  sort: true,
  //filter: textFilter()
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
      stocks: [
                {
                    "stock": null,
                    "shares": null,
                    "sentiment": null,
                    "avg_cost": null,
                    "total_return": '0',
                    "curr_price": null
                }
              ],
      width: 400
    };
  }

  componentDidMount = () => {
    axios.get("/getPosts").then(response => {
      this.setState ({
        stocks: response.data.sort((a,b) => a.shares + b.shares).slice(0,30)
      });
    });
  };

  render() {

    const expandRow = {
      renderer: row => (
        <Posts stock={row.stock} tickerList={this.state.stocks} />
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
        filter={ filterFactory() }
        expandRow={ expandRow }
      />
    )
  }
}