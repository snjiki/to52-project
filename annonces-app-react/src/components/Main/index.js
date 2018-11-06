import React, { Component } from 'react';
import './styles.sass';
import './styles.css';
import Item from '../Item/index';
import axios from 'axios';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
    
    // fetching items from database
    axios.get('/api/item/all').then(res => {
      this.setState({
        data: res.data
      });
      
    });

  }
  render() {
    return (
      <main className="main">
        {Object.keys(this.state.data).map((e, i) => <Item key={i} item={this.state.data[e]} nb={i} />)}
      </main>
    );
  }
}

export default Homepage;
