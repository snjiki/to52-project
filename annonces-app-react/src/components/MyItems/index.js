import React, { Component } from 'react';

import UserItem from '../UserItem/index';
import AddItemPage from '../AddItemPage/index';
import './styles.sass';
import './styles.css';
import axios from 'axios';
class MyItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false,
        items :[],
        nb: null,
        data: {}
    };

  }


  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
      this.state.nb = localStorage.getItem('email');
      axios.get(`/api/item/myItems/${this.state.nb}`).then(res => {
          this.setState({
              data: res.data
          });

      });
  }


  closeModal() {
    this.setState({ modalOpened: false });
    document.body.classList.remove('modal-opened');
    document.body.style.marginRight = 0;
  }

  getModal() {
    if (this.state.modalOpened) {
      return <AddItemPage openClass="open" items={this.state.items} close={this.closeModal.bind(this)} />;
    } else {
      return;
    }
  }

  openModal() {
    const scrollBar = document.querySelector('.scrollbar-measure');
    //const scrollBarWidth = scrollBar.offsetWidth - scrollBar.clientWidth;
    document.body.classList.add('modal-opened');
    //document.body.style.marginRight = `${scrollBarWidth}px`;
    this.setState({ modalOpened: true });
  }

  render() {
    return (

      <div className="myItemsWrapper">
        {this.getModal()}
        <div className="addTradeWrapper">
          <button
            onClick={() => {
              this.openModal();
            }}
            className="tradeBtn addItemBtn">
            + Add Item
          </button>
        </div>
        { Object.keys(this.state.data).map((e,i) => <UserItem editModal={this.openModal.bind(this)} items={this.state.items} item={this.state.data[e]} nb={i}/>)}
      </div>
    );
  }
}

export default MyItems;
