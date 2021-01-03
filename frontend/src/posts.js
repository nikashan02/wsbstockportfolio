import React, { Component } from 'react';

export default class Posts extends Component {
  render() {

    let ticker = this.props.stock;
    let data = this.props.tickerList.find(item => { return item.stock === ticker }).posts;
    let listItems = data.map(d => 
      <li style={{margin: "0 0 15px 0"}}>
        <span>
          <a href={d.url}>{d.title}</a>
        </span>
        <br></br>
        <span>
          {d.upvotes} upvotes | Price: ${d.historical} on {d.created}
        </span>
      </li>
    );

    return(
      <div>
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }
}