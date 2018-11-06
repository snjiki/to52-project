import React, { Component } from 'react';
//import { Link } from 'react-router';
import { Link } from 'react-router-dom'
import './styles.sass';
import './styles.css';

class ItemPage extends Component {
    constructor(props) {
        super(props);

    }
  componentDidMount() {
    document.body.scrollTop = 0;

    document.querySelector('.menu').classList.remove('open');

  }
  render() {
    return (
      <div className="itemPageWrapper">
        <div className="itemImgWrapper" >
        <img className="img itemImgWrapper imageItemPage" src={"data:"+ this.props.location.state.imageType +";base64,"+ this.props.location.state.imgB64} />
        </div>
        <div className="itemInfoWrapper">
          <Link className="backLink" to="/">
            <span className="small">
              <svg fill="#000000" height="13" viewBox="0 0 18 15" width="13" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </span>All Items
          </Link>
          <h3 className="itemName">{this.props.location.state.item.name}</h3>
          <p className="itemCost frm">{this.props.location.state.item.price}</p>
          <p className="description">
              {this.props.location.state.item.description}
          </p>
          <button className="reqTradeBtn normalBtn">Request Trade</button>
        </div>
      </div>
    );
  }
}

export default ItemPage;
