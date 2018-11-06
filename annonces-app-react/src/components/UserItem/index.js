import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles.sass';
import './styles.css';
import axios from 'axios';

class UserItem extends Component {

  constructor(props) {
    super(props);
      this.state = {
          data: {},
          imageType: "",
          imgB64: ""
      };
  }
    componentDidMount() {
        document.body.scrollTop = 0;
        document.querySelector('.menu').classList.remove('open');
        if (this.props.item.image){
            //let thumb = new Buffer(this.props.item.image.data.data);

            //var imageBase64 = btoa(String.fromCharCode.apply(null, this.props.item.image.data.data));
            let imageBase64 = btoa(String.fromCharCode(...new Uint8Array(this.props.item.image.data.data)));

            this.setState({
                imageType: this.props.item.image.contentType,
                imgB64: imageBase64
            });
        }
    }

    deleteItem(id){
      axios.get(`/api/item/delete/${id}`).then(
          console.log('Deleted'))
          .catch(err => console.log(err)
          ).then( res => {
          window.location.reload();
          });
    }

  render() {
    return (
      <div className="uIWrapper">
        <div className="upper">
          <div className="userImg" ><img className="userImg" src={"data:"+ this.state.imageType +";base64,"+ this.state.imgB64} /></div>
          <div className="itemInfo">
            <h3 className="itemName">
              <Link to={{ pathname: `/item/${this.props.nb}`,  state: {
                  item: this.props.item,
                  imgB64: this.state.imgB64,
                  imageType: this.state.imageType
              } }}>{this.props.item.name}</Link>
            </h3>
            <p className="itemCost frm">{this.props.item.price}</p>
            <p className="addDate frm">{this.props.item.publicationDate}</p>
            <p className="itemDescription">{this.props.item.description}</p>
            <div className="tradeBtnWrapper lower">
              <button className="deleteBtn normalBtn"  onClick={() => this.deleteItem(this.props.item._id)}>Remove Item</button>
              <button className="editBtn normalBtn" onClick={this.props.editModal}>Edit Info</button>
            </div>
          </div>
        </div>
      </div>
        )
  }
}

export default UserItem;

UserItem.propTypes = {
  editModal: PropTypes.func
};

